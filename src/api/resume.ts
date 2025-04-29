import axiosInstance from "./axios";

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

type ResumeInputData = {
  userId: string;
  hopeJobGroup: string;
  hopeJobRole: string[];
  stackList: string[];
  careerDTOS: CareerDTO[];
  projectDTOS: ProjectDTO[];
};
export interface ResumeAnalysisResponse {
  commonSkills: string[];
  missingSkills: string[];
  recommendations: string[];
  recommendedJobs: {
    jobPostingId: string;
    title: string;
    description: string | null;
  }[];
}

export const analyzeResume = async (
  file: File
): Promise<ResumeAnalysisResponse> => {
  try {
    const formData = new FormData();
    formData.append("resume", file);

    const response = await axiosInstance.post<ResumeAnalysisResponse>(
      "/openai/analyze",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("API Raw Response:", response);
    console.log("API Response Data:", response.data);

    return response.data;
  } catch (error) {
    console.error("이력서 분석 실패:", error);
    throw error;
  }
};

export const analyzeResumeInput = async (
  data: ResumeInputData
): Promise<ResumeAnalysisResponse> => {
  try {
    const response = await axiosInstance.post<ResumeAnalysisResponse>(
      "/resume/input",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("이력서 폼 분석 API 호출 실패:", error);
    throw new Error("이력서 분석에 실패했습니다.");
  }
};
