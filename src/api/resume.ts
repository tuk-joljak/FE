import axiosInstance from "./axios";
import { ResumeFormData, ResumeAnalysisResponse } from "@/types/resume";

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

    return response.data;
  } catch (error) {
    console.error("이력서 분석 실패:", error);
    throw error;
  }
};

export const analyzeResumeInput = async (
  data: ResumeFormData
): Promise<ResumeAnalysisResponse> => {
  try {
    // 이력서 데이터 저장
    const saveResponse = await axiosInstance.post<{ resumeId: string, success: boolean, message: string }>(
      "/resume/input",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    if (!saveResponse.data.success) {
      throw new Error(saveResponse.data.message || "이력서 저장에 실패했습니다.");
    }
    
    // 저장된 이력서 ID로 분석 결과 가져오기
    const analysisResponse = await axiosInstance.post<ResumeAnalysisResponse>(
      `/openai/analyze/form?resumeId=${saveResponse.data.resumeId}`
    );
    
    return analysisResponse.data;
  } catch (error) {
    console.error("이력서 폼 분석 API 호출 실패:", error);
    throw new Error("이력서 분석에 실패했습니다.");
  }
};
