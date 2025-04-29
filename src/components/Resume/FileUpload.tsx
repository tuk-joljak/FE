import { Upload } from "lucide-react";

interface FileUploadProps {
  file: File | null;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload = ({ file, onFileChange }: FileUploadProps) => {
  return (
    <div className="p-8 border-2 border-gray-300 border-dashed rounded-lg">
      <div className="flex flex-col items-center justify-center">
        <Upload className="w-12 h-12 mb-4 text-gray-400" />
        <div className="text-center">
          <label className="cursor-pointer">
            <span className="px-4 py-2 mt-2 text-base leading-normal text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600">
              PDF 파일 선택
            </span>
            <input
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={onFileChange}
            />
          </label>
        </div>
        {file && (
          <div className="mt-4 text-sm text-gray-600">
            선택된 파일: {file.name}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload; 