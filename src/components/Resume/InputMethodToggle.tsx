import { Upload, FileText } from "lucide-react";
import { InputMethod } from "@/types/resume";

interface InputMethodToggleProps {
  inputMethod: InputMethod;
  onInputMethodChange: (method: InputMethod) => void;
}

const InputMethodToggle = ({ inputMethod, onInputMethodChange }: InputMethodToggleProps) => {
  return (
    <div className="flex mb-6">
      <button
        className={`flex items-center mr-4 px-4 py-2 rounded-lg ${
          inputMethod === "file"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
        onClick={() => onInputMethodChange("file")}
      >
        <Upload className="w-5 h-5 mr-2" />
        파일 업로드
      </button>
      <button
        className={`flex items-center px-4 py-2 rounded-lg ${
          inputMethod === "form"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
        onClick={() => onInputMethodChange("form")}
      >
        <FileText className="w-5 h-5 mr-2" />
        직접 입력
      </button>
    </div>
  );
};

export default InputMethodToggle; 