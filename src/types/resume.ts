export interface RecommendedJob {
  jobPostingId: string;
  title: string;
  description: string | null;
  deadline: string | null;
  location: string;
  career: string | null;
  task: string;
  qualification: string;
  preference: string;
  stack: string;
  hiringProcess: string;
  imageUrl: string;
  createAt: string;
  updateAt: string;
  companyDAO: {
    companyId: string;
    companyName: string;
    companyDescription: string;
    companyCategory: string;
    createAt: string;
    updateAt: string;
  };
}

export interface ResumeAnalysis {
  commonSkills: string[];
  missingSkills: string[];
  recommendations: string[];
  recommendedJobs: RecommendedJob[];
}

// API 응답 타입
export interface ResumeAnalysisResponse {
  commonSkills: string[];
  missingSkills: string[];
  recommendations: string[];
  recommendedJobs: RecommendedJob[];
}

export type InputMethod = "file" | "form";

export type CareerDTO = {
  companyName: string;
  position: string;
  department: string;
  workingPeriod: string;
  employmentType: string;
  isCurrentlyEmployed: boolean;
  responsibility: string;
};

export type ProjectDTO = {
  projectName: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type ResumeFormData = {
  userId: string;
  hopeJobGroup: string;
  hopeJobRole: string[];
  stackList: string[];
  careerDTOS: CareerDTO[];
  projectDTOS: ProjectDTO[];
};

export const initialCareerDTO: CareerDTO = {
  companyName: "",
  position: "",
  department: "",
  workingPeriod: "",
  employmentType: "",
  isCurrentlyEmployed: false,
  responsibility: "",
};

export const initialProjectDTO: ProjectDTO = {
  projectName: "",
  organization: "",
  startDate: "",
  endDate: "",
  description: "",
};

export const initialFormData: ResumeFormData = {
  userId: "",
  hopeJobGroup: "",
  hopeJobRole: [],
  stackList: [],
  careerDTOS: [initialCareerDTO],
  projectDTOS: [initialProjectDTO],
}; 