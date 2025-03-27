import axiosInstance from './axios';
import { JobPostingResponse } from '../types/jobPosting';

export const fetchAllJobPostings = async (): Promise<JobPostingResponse> => {
  try {
    const response = await axiosInstance.get<JobPostingResponse>('/job/posting/all');
    return response.data;
  } catch (error) {
    console.error('채용공고 조회 실패:', error);
    throw error;
  }
};

interface JobPostingDetail {
  title: string;
  companyName: string;
  location: string;
  career: string | null;
  task: string;
  qualification: string;
  preference: string;
  deadline: string | null;
  stack: string;
  hiringProcess: string;
}

interface JobPostingDetailResponse {
  success: boolean;
  message: string;
  jobPostingInfo: JobPostingDetail;
}

export const fetchJobPostingDetail = async (jobPostingId: string): Promise<JobPostingDetailResponse> => {
  try {
    const response = await axiosInstance.get<JobPostingDetailResponse>(`/job/posting/${jobPostingId}`);
    return response.data;
  } catch (error) {
    console.error('채용공고 상세 조회 실패:', error);
    throw error;
  }
}; 