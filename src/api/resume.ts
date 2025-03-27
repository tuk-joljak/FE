import axiosInstance from './axios';

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

export const analyzeResume = async (file: File): Promise<ResumeAnalysisResponse> => {
  try {
    const formData = new FormData();
    formData.append('resume', file);

    const response = await axiosInstance.post<ResumeAnalysisResponse>('/openai/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // 응답 데이터 로깅
    console.log('API Raw Response:', response);
    console.log('API Response Data:', response.data);

    return response.data;
  } catch (error) {
    console.error('이력서 분석 실패:', error);
    throw error;
  }
}; 