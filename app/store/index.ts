import { create } from "zustand";

interface FileUploads {
  passportImage: File | null;
  photo: File | null;
  supportingDocs: File[];
}

interface FilesStore {
  fileUploads: FileUploads;
  setPassportImage: (item: File) => void;
  setPhoto: (item: File) => void;
  setSupportingDocs: (items: File[]) => void;
}

export const useFilesStore = create<FilesStore>((set) => ({
  fileUploads: {
    passportImage: null,
    photo: null,
    supportingDocs: [],
  },
  setPassportImage: (item) =>
    set((state) => ({
      fileUploads: { ...state.fileUploads, passportImage: item },
    })),
  setPhoto: (item) =>
    set((state) => ({
      fileUploads: { ...state.fileUploads, photo: item },
    })),
  setSupportingDocs: (items) =>
    set((state) => ({
      fileUploads: { ...state.fileUploads, supportingDocs: items },
    })),
}));
