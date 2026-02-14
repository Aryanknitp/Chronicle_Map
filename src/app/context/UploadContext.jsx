import { createContext, useContext, useState, useCallback } from 'react';

const UploadContext = createContext();

export const useUpload = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error('useUpload must be used within an UploadProvider');
  }
  return context;
};

export const UploadProvider = ({ children }) => {
  const [draftUpload, setDraftUpload] = useState({
    files: [],
    metadata: {
      title: '',
      description: '',
      year: new Date().getFullYear(),
      tags: [],
      category: 'photo',
    },
    location: null,
    consent: false,
    attribution: '',
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const updateFiles = useCallback((files) => {
    setDraftUpload((prev) => ({ ...prev, files }));
  }, []);

  const updateMetadata = useCallback((metadata) => {
    setDraftUpload((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, ...metadata },
    }));
  }, []);

  const updateLocation = useCallback((location) => {
    setDraftUpload((prev) => ({ ...prev, location }));
  }, []);

  const updateConsent = useCallback((consent) => {
    setDraftUpload((prev) => ({ ...prev, consent }));
  }, []);

  const updateAttribution = useCallback((attribution) => {
    setDraftUpload((prev) => ({ ...prev, attribution }));
  }, []);

  const resetDraft = useCallback(() => {
    setDraftUpload({
      files: [],
      metadata: {
        title: '',
        description: '',
        year: new Date().getFullYear(),
        tags: [],
        category: 'photo',
      },
      location: null,
      consent: false,
      attribution: '',
    });
    setUploadProgress(0);
  }, []);

  const value = {
    draftUpload,
    uploadProgress,
    isUploading,
    setIsUploading,
    setUploadProgress,
    updateFiles,
    updateMetadata,
    updateLocation,
    updateConsent,
    updateAttribution,
    resetDraft,
  };

  return <UploadContext.Provider value={value}>{children}</UploadContext.Provider>;
};
