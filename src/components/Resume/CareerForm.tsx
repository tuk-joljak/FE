import { CareerDTO } from "@/types/resume";

interface CareerFormProps {
  careers: CareerDTO[];
  onCareerChange: (index: number, field: keyof CareerDTO, value: string | boolean) => void;
  onAddCareer: () => void;
  onRemoveCareer: (index: number) => void;
}

const CareerForm = ({ careers, onCareerChange, onAddCareer, onRemoveCareer }: CareerFormProps) => {
  return (
    <div className="p-6 border border-gray-200 rounded-lg">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">경력 정보</h2>
        <button
          type="button"
          onClick={onAddCareer}
          className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          + 경력 추가
        </button>
      </div>

      {careers.map((career, index) => (
        <div
          key={index}
          className="p-4 mb-4 border border-gray-200 rounded"
        >
          <div className="flex justify-between mb-2">
            <h3 className="font-medium">경력 #{index + 1}</h3>
            {careers.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveCareer(index)}
                className="px-2 text-sm text-red-500"
              >
                삭제
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                회사명
              </label>
              <input
                type="text"
                value={career.companyName}
                onChange={(e) =>
                  onCareerChange(
                    index,
                    "companyName",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                직책
              </label>
              <input
                type="text"
                value={career.position}
                onChange={(e) =>
                  onCareerChange(
                    index,
                    "position",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                부서
              </label>
              <input
                type="text"
                value={career.department}
                onChange={(e) =>
                  onCareerChange(
                    index,
                    "department",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                근무 기간 (예: 2020.01 ~ 2022.12)
              </label>
              <input
                type="text"
                value={career.workingPeriod}
                onChange={(e) =>
                  onCareerChange(
                    index,
                    "workingPeriod",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                고용 형태
              </label>
              <select
                value={career.employmentType}
                onChange={(e) =>
                  onCareerChange(
                    index,
                    "employmentType",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">선택하세요</option>
                <option value="정규직">정규직</option>
                <option value="계약직">계약직</option>
                <option value="인턴">인턴</option>
                <option value="프리랜서">프리랜서</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id={`isCurrentlyEmployed-${index}`}
                checked={career.isCurrentlyEmployed}
                onChange={(e) =>
                  onCareerChange(
                    index,
                    "isCurrentlyEmployed",
                    e.target.checked
                  )
                }
                className="w-4 h-4 mr-2"
              />
              <label
                htmlFor={`isCurrentlyEmployed-${index}`}
                className="text-sm text-gray-700"
              >
                현재 재직 중
              </label>
            </div>
          </div>
          <div className="mt-3">
            <label className="block mb-1 text-sm text-gray-700">
              담당 업무
            </label>
            <textarea
              value={career.responsibility}
              onChange={(e) =>
                onCareerChange(
                  index,
                  "responsibility",
                  e.target.value
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={2}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CareerForm; 