import { CvDocument } from '@/api';
import { CvDocumentParser } from '@/parsers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

const DOCUMENT_STORAGE_KEY = '@res_cv_document';
const DEFAULT_EXPORT_FILE_NAME = 'cv';

interface DocumentContextType {
  documentData: CvDocument;
  setDocumentData: React.Dispatch<React.SetStateAction<CvDocument>>;
  updateDocument: (updates: Partial<CvDocument>) => void;
  resetDocument: () => void;
  exportDocument: (fileName?: string) => Promise<void>;
  importDocument: () => Promise<CvDocument | null | undefined>;
  isLoading: boolean;
}

const defaultDocument: CvDocument = {
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
  const [documentData, setDocumentData] = useState<CvDocument>(defaultDocument);
  const [isLoading, setIsLoading] = useState(true);

  // Load document from AsyncStorage on mount
  useEffect(() => {
    loadDocument();
  }, []);

  // Save document to AsyncStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      saveDocument(documentData);
    }
  }, [documentData, isLoading]);

  /**
   * Loads the document from AsyncStorage.
   * If the document exists, it parses and sets it to state.
   */
  const loadDocument = async () => {
    try {
      const storedDocument = await AsyncStorage.getItem(DOCUMENT_STORAGE_KEY);
      if (storedDocument) {
        const parsedDocument = JSON.parse(storedDocument);
        setDocumentData(parsedDocument);
      }
    } catch (error) {
      console.error('Error loading document from storage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Saves the document to AsyncStorage.
   * @param documentToSave - The document to save to AsyncStorage.
   */
  const saveDocument = async (documentToSave: CvDocument) => {
    try {
      await AsyncStorage.setItem(
        DOCUMENT_STORAGE_KEY,
        JSON.stringify(documentToSave)
      );
    } catch (error) {
      console.error('Error saving document to storage:', error);
    }
  };

  /**
   * Exports the current document as a JSON file.
   * This function creates a Blob from the JSON string and triggers a download.
   */
  const exportDocument = async (
    fileName: string = DEFAULT_EXPORT_FILE_NAME
  ) => {
    try {
      const jsonDocument = JSON.stringify(documentData, null, 2);
      const blob = new Blob([jsonDocument], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting document:', error);
    }
  };

  /**
   * Imports a document from a file using the DocumentPicker.
   * It reads the file, parses it as JSON, and updates the document state.
   */
  const importDocument = async () => {
    const pickerOptions = {};
    const file = await DocumentPicker.getDocumentAsync(pickerOptions);
    const first = (file.assets ?? []).length > 0 ? file.assets?.[0] : null;
    if (!first) {
      console.error('No file selected for import');
      return;
    }

    // Convert the blob to text, then parse it as JSON
    const text = await first.file?.text();
    if (!text) {
      console.error('No text content found in the selected file');
      return;
    }

    const doc = CvDocumentParser.safeParse(text);
    if (!doc) {
      console.error('CV document is invalid or could not be parsed');
      return;
    }

    setDocumentData(doc);

    return doc;
  };

  /**
   * Updates the document with new data.
   * @param updates - Partial updates to the document.
   */
  const updateDocument = (updates: Partial<CvDocument>) => {
    setDocumentData((prev) => ({ ...prev, ...updates }));
  };

  /**
   * Resets the document to its default state.
   */
  const resetDocument = () => {
    setDocumentData(defaultDocument);
  };

  const value: DocumentContextType = {
    documentData,
    setDocumentData,
    exportDocument,
    importDocument,
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
