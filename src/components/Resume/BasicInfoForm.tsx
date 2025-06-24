import { ResumeFormData } from "@/types/resume";

interface BasicInfoFormProps {
  formData: ResumeFormData;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onArrayChange: (name: string, value: string) => void;
}

const BasicInfoForm = ({ formData, onFormChange, onArrayChange }: BasicInfoFormProps) => {
  return (
    <div className="p-6 border border-gray-200 rounded-lg">
      <h2 className="mb-4 text-lg font-semibold">기본 정보</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            희망 직군
          </label>
          <input
            type="text"
            name="hopeJobGroup"
            value={formData.hopeJobGroup}
            onChange={onFormChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="예: 개발, 디자인, 마케팅 등"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            희망 직무 (쉼표로 구분)
          </label>
          <input
            type="text"
            name="hopeJobRole"
            value={formData.hopeJobRole.join(", ")}
            onChange={(e) => onArrayChange("hopeJobRole", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="예: 백엔드, 프론트엔드"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            보유 기술 스택 (쉼표로 구분)
          </label>
          <input
            type="text"
            name="stackList"
            value={formData.stackList.join(", ")}
            onChange={(e) => onArrayChange("stackList", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="예: Spring Boot, AWS, Docker"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoForm; 