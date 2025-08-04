import { Document } from '@/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

const DOCUMENT_STORAGE_KEY = '@res_cv_document';

interface DocumentContextType {
  document: Document;
  setDocument: React.Dispatch<React.SetStateAction<Document>>;
  updateDocument: (updates: Partial<Document>) => void;
  resetDocument: () => void;
  exportDocument: () => Promise<void>;
  isLoading: boolean;
}

const defaultDocument: Document = {
  id: 1,
  contactInfo: {},
  projects: [],
  skills: [],
  education: [],
  experience: [],
  languages: [],
  awards: [],
};

const DocumentContext = createContext<DocumentContextType | undefined>(
  undefined
);

interface DocumentProviderProps {
  children: ReactNode;
}

export function DocumentProvider({ children }: DocumentProviderProps) {
  const [data, setData] = useState<Document>(defaultDocument);
  const [isLoading, setIsLoading] = useState(true);

  // Load document from AsyncStorage on mount
  useEffect(() => {
    loadDocument();
  }, []);

  // Save document to AsyncStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      saveDocument(data);
    }
  }, [data, isLoading]);

  const loadDocument = async () => {
    try {
      const storedDocument = await AsyncStorage.getItem(DOCUMENT_STORAGE_KEY);
      if (storedDocument) {
        const parsedDocument = JSON.parse(storedDocument);
        setData(parsedDocument);
      }
    } catch (error) {
      console.error('Error loading document from storage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveDocument = async (documentToSave: Document) => {
    try {
      await AsyncStorage.setItem(
        DOCUMENT_STORAGE_KEY,
        JSON.stringify(documentToSave)
      );
    } catch (error) {
      console.error('Error saving document to storage:', error);
    }
  };

  const exportDocument = async () => {
    try {
      const jsonDocument = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonDocument], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cv.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting document:', error);
    }
  };

  const updateDocument = (updates: Partial<Document>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const resetDocument = () => {
    setData(defaultDocument);
  };

  const value: DocumentContextType = {
    document: data,
    setDocument: setData,
    exportDocument,
    updateDocument,
    resetDocument,
    isLoading,
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocument() {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
}
