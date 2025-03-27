export interface JobPosting {
  jobPostingId: string;
  title: string;
  career: string | null;
  deadline: string | null;
  companyName: string;
  location: string;
}

export interface JobPostingResponse {
  jobPostingList: JobPosting[];
  success: boolean;
  message: string;
} 