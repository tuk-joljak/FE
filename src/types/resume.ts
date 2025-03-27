export interface RecommendedJob {
  jobPostingId: string;
  title: string;
  description: string | null;
  // 필요한 다른 필드들...
}

export interface ResumeAnalysis {
  commonSkills: string[];
  missingSkills: string[];
  recommendations: string[];
  recommendedJobs: RecommendedJob[];
}

// API 응답 타입
export interface ResumeAnalysisResponse {
  success: boolean;
  message: string;
  data: ResumeAnalysis;
} 