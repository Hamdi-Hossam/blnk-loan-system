export interface UploadFile {
  file: File;
  preview: string;
  progress: number;
}

export interface FilesPreviewProps {
  files: UploadFile[];
  handleDelete: (index: number) => void;
  handleDeleteAll: () => void;
  handleRename: () => void;
  isLoading: boolean;
}
