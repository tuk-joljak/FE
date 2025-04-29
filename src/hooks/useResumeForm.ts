import { useState } from "react";
import { ResumeFormData, CareerDTO, ProjectDTO, initialFormData, ResumeAnalysisResponse } from "@/types/resume";
import { analyzeResume, analyzeResumeInput } from "@/api/resume";

export const useResumeForm = () => {
  const [inputMethod, setInputMethod] = useState<"file" | "form">("file");
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

  return {
    inputMethod,
    setInputMethod,
    file,
    isLoading,
    error,
    analysis,
    formData,
    handleFileChange,
    handleSubmit,
    handleFormChange,
    handleArrayChange,
    handleCareerChange,
    handleProjectChange,
    addCareer,
    addProject,
    removeCareer,
    removeProject,
  };
}; 