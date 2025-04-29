import { useState } from "react";
import { analyzeResume, analyzeResumeInput } from "@/api/resume";
import type { ResumeAnalysisResponse } from "@/api/resume";
import { Upload, FileText } from "lucide-react";
import ResumeAnalysisResult from "@/components/Resume/ResumeAnalysisResult";

type InputMethod = "file" | "form";
type CareerDTO = {
  companyName: string;
  position: string;
  department: string;
  workingPeriod: string;
  employmentType: string;
  isCurrentlyEmployed: boolean;
  responsibility: string;
};

type ProjectDTO = {
  projectName: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
};

type ResumeFormData = {
  userId: string;
  hopeJobGroup: string;
  hopeJobRole: string[];
  stackList: string[];
  careerDTOS: CareerDTO[];
  projectDTOS: ProjectDTO[];
};

const initialFormData: ResumeFormData = {
  userId: "",
  hopeJobGroup: "",
  hopeJobRole: [],
  stackList: [],
  careerDTOS: [
    {
      companyName: "",
      position: "",
      department: "",
      workingPeriod: "",
      employmentType: "",
      isCurrentlyEmployed: false,
      responsibility: "",
    },
  ],
  projectDTOS: [
    {
      projectName: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
};

const ResumePage = () => {
  const [inputMethod, setInputMethod] = useState<InputMethod>("file");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ResumeAnalysisResponse | null>(null);
  const [formData, setFormData] = useState<ResumeFormData>(initialFormData);

  // PDF 파일 처리
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("PDF 파일만 업로드 가능합니다.");
      setFile(null);
    }
  };

  // 폼 제출 처리
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      setError(null);

      let response;
      if (inputMethod === "file") {
        if (!file) {
          setError("파일을 선택해주세요.");
          setIsLoading(false);
          return;
        }
        response = await analyzeResume(file);
      } else {
        // 폼 데이터 유효성 검사
        if (!formData.hopeJobGroup) {
          setError("희망 직군을 입력해주세요.");
          setIsLoading(false);
          return;
        }
        if (formData.hopeJobRole.length === 0) {
          setError("희망 직무를 하나 이상 입력해주세요.");
          setIsLoading(false);
          return;
        }
        response = await analyzeResumeInput(formData);
      }

      console.log("분석 결과:", response);
      setAnalysis(response);
    } catch (err) {
      console.error("에러 발생:", err);
      setError("이력서 분석 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 폼 데이터 변경 처리
  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 배열 필드 변경 처리 (hopeJobRole, stackList)
  const handleArrayChange = (name: string, value: string) => {
    const values = value.split(",").map((item) => item.trim());
    setFormData((prev) => ({
      ...prev,
      [name]: values,
    }));
  };

  // 경력 정보 변경 처리
  const handleCareerChange = (
    index: number,
    field: keyof CareerDTO,
    value: string | boolean
  ) => {
    setFormData((prev) => {
      const updatedCareers = [...prev.careerDTOS];
      updatedCareers[index] = {
        ...updatedCareers[index],
        [field]: value,
      };
      return {
        ...prev,
        careerDTOS: updatedCareers,
      };
    });
  };

  // 프로젝트 정보 변경 처리
  const handleProjectChange = (
    index: number,
    field: keyof ProjectDTO,
    value: string
  ) => {
    setFormData((prev) => {
      const updatedProjects = [...prev.projectDTOS];
      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: value,
      };
      return {
        ...prev,
        projectDTOS: updatedProjects,
      };
    });
  };

  // 경력 추가
  const addCareer = () => {
    setFormData((prev) => ({
      ...prev,
      careerDTOS: [
        ...prev.careerDTOS,
        {
          companyName: "",
          position: "",
          department: "",
          workingPeriod: "",
          employmentType: "",
          isCurrentlyEmployed: false,
          responsibility: "",
        },
      ],
    }));
  };

  // 프로젝트 추가
  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projectDTOS: [
        ...prev.projectDTOS,
        {
          projectName: "",
          organization: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  // 경력 삭제
  const removeCareer = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      careerDTOS: prev.careerDTOS.filter((_, i) => i !== index),
    }));
  };

  // 프로젝트 삭제
  const removeProject = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      projectDTOS: prev.projectDTOS.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-4xl px-4 mx-auto">
        <div className="p-8 mb-6 bg-white rounded-lg shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">이력서 분석</h1>

          {/* 입력 방식 토글 */}
          <div className="flex mb-6">
            <button
              className={`flex items-center mr-4 px-4 py-2 rounded-lg ${
                inputMethod === "file"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setInputMethod("file")}
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
              onClick={() => setInputMethod("form")}
            >
              <FileText className="w-5 h-5 mr-2" />
              직접 입력
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {inputMethod === "file" ? (
              // 파일 업로드 UI
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
                        onChange={handleFileChange}
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
            ) : (
              // 폼 입력 UI
              <div className="space-y-6">
                {/* 기본 정보 */}
                <div className="p-6 border border-gray-200 rounded-lg">
                  <h2 className="mb-4 text-lg font-semibold">기본 정보</h2>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        사용자 ID
                      </label>
                      <input
                        type="text"
                        name="userId"
                        value={formData.userId}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="사용자 ID를 입력하세요"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        희망 직군
                      </label>
                      <input
                        type="text"
                        name="hopeJobGroup"
                        value={formData.hopeJobGroup}
                        onChange={handleFormChange}
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
                        onChange={(e) =>
                          handleArrayChange("hopeJobRole", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleArrayChange("stackList", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="예: Spring Boot, AWS, Docker"
                      />
                    </div>
                  </div>
                </div>

                {/* 경력 정보 */}
                <div className="p-6 border border-gray-200 rounded-lg">
                  <div className="flex justify-between mb-4">
                    <h2 className="text-lg font-semibold">경력 정보</h2>
                    <button
                      type="button"
                      onClick={addCareer}
                      className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                      + 경력 추가
                    </button>
                  </div>

                  {formData.careerDTOS.map((career, index) => (
                    <div
                      key={index}
                      className="p-4 mb-4 border border-gray-200 rounded"
                    >
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">경력 #{index + 1}</h3>
                        {formData.careerDTOS.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCareer(index)}
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
                              handleCareerChange(
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
                              handleCareerChange(
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
                              handleCareerChange(
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
                              handleCareerChange(
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
                              handleCareerChange(
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
                              handleCareerChange(
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
                            handleCareerChange(
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

                {/* 프로젝트 정보 */}
                <div className="p-6 border border-gray-200 rounded-lg">
                  <div className="flex justify-between mb-4">
                    <h2 className="text-lg font-semibold">프로젝트 정보</h2>
                    <button
                      type="button"
                      onClick={addProject}
                      className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                      + 프로젝트 추가
                    </button>
                  </div>

                  {formData.projectDTOS.map((project, index) => (
                    <div
                      key={index}
                      className="p-4 mb-4 border border-gray-200 rounded"
                    >
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">프로젝트 #{index + 1}</h3>
                        {formData.projectDTOS.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeProject(index)}
                            className="px-2 text-sm text-red-500"
                          >
                            삭제
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <div>
                          <label className="block mb-1 text-sm text-gray-700">
                            프로젝트명
                          </label>
                          <input
                            type="text"
                            value={project.projectName}
                            onChange={(e) =>
                              handleProjectChange(
                                index,
                                "projectName",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-sm text-gray-700">
                            소속 조직
                          </label>
                          <input
                            type="text"
                            value={project.organization}
                            onChange={(e) =>
                              handleProjectChange(
                                index,
                                "organization",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-sm text-gray-700">
                            시작일 (YYYY-MM-DD)
                          </label>
                          <input
                            type="date"
                            value={project.startDate}
                            onChange={(e) =>
                              handleProjectChange(
                                index,
                                "startDate",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-sm text-gray-700">
                            종료일 (YYYY-MM-DD)
                          </label>
                          <input
                            type="date"
                            value={project.endDate}
                            onChange={(e) =>
                              handleProjectChange(
                                index,
                                "endDate",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <label className="block mb-1 text-sm text-gray-700">
                          프로젝트 설명
                        </label>
                        <textarea
                          value={project.description}
                          onChange={(e) =>
                            handleProjectChange(
                              index,
                              "description",
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
              </div>
            )}

            {error && <div className="text-sm text-red-500">{error}</div>}

            <button
              type="submit"
              disabled={isLoading || (inputMethod === "file" && !file)}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white 
                ${
                  isLoading || (inputMethod === "file" && !file)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } transition-colors`}
            >
              {isLoading ? "분석 중..." : "분석하기"}
            </button>
          </form>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="w-12 h-12 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="p-4 mt-4 border border-red-200 rounded-lg bg-red-50">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {analysis && <ResumeAnalysisResult analysis={analysis} />}
      </div>
    </div>
  );
};

export default ResumePage;
