import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileWithPreview extends File {
  preview: string;
}

const ResumePage = () => {
  const [file, setFile] = useState<FileWithPreview | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const fileWithPreview: FileWithPreview = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
      setFile(fileWithPreview);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "pdf/*": [] }, // 수정된 부분
  });

  // 파일 제출 핸들러
  const handleSubmit = () => {
    console.log("Submitting file:", file);
    setFile(null); // 제출 후 파일 초기화
  };

  return (
    <div className="container p-4 mx-auto">
      <div
        {...getRootProps({
          className:
            "dropzone flex justify-center items-center p-6 border-2 border-dashed border-primary rounded-lg cursor-pointer hover:border-accent",
        })}
      >
        <input {...getInputProps()} />
        {!file ? (
          <p className="text-lg text-gray-700">
            드래그 앤 드롭이나 이 곳을 눌러 이력서를 올려주세요.
          </p>
        ) : (
          <img src={file.preview} alt="Preview" className="h-auto max-w-full" />
        )}
      </div>
      {file && (
        <Button
          onClick={handleSubmit}
          className="px-4 py-2 mt-4 text-white rounded bg-primary hover:bg-accent"
        >
          제출하기
        </Button>
      )}
    </div>
  );
};

export default ResumePage;
