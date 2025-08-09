import { CvDocument, CvDocumentSchema } from '@/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Platform } from 'react-native';

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
        const parsed = CvDocumentSchema.safeParse(JSON.parse(storedDocument));
        if (parsed.success) {
          setDocumentData(parsed.data);
        } else {
          console.error(
            'Stored document failed validation, using default:',
            parsed.error
          );
          setDocumentData(defaultDocument);
        }
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
      // Web pathway
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const blob = new Blob([jsonDocument], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        return;
      }
      // Native pathway not implemented without expo-file-system and expo-sharing
      console.warn('Export is only implemented for web at the moment.');
    } catch (error) {
      console.error('Error exporting document:', error);
    }
  };

  /**
   * Imports a document from a file using the DocumentPicker.
   * It reads the file, parses it as JSON, and updates the document state.
   */
  const importDocument = async () => {
    const file = await DocumentPicker.getDocumentAsync({
      type: 'application/json',
    });
    const first = (file.assets ?? []).length > 0 ? file.assets?.[0] : null;
    if (!first) {
      console.error('No file selected for import');
      return;
    }

    let text: string | undefined;
    // Web provides a File object
    if (first.file && 'text' in first.file) {
      text = await (first.file as unknown as File).text();
    } else if (Platform.OS !== 'web') {
      console.warn('Import is only implemented for web at the moment.');
    }

    if (!text) {
      console.error('No text content found in the selected file');
      return;
    }

    const doc = CvDocumentSchema.safeParse(JSON.parse(text));
    if (!doc.success) {
      console.error(
        `CV document is invalid or could not be parsed: ${doc.error}`
      );
      return;
    }

    setDocumentData(doc.data);
    return doc.data;
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
