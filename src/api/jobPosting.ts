import axiosInstance from './axios';
import { JobPostingResponse } from '../types/jobPosting';
import type { JobPostingCommentListResponse, CreateJobPostingCommentRequest, CreateJobPostingCommentResponse, DeleteJobPostingCommentResponse } from '@/types/user';

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

// 공고 댓글 전체 조회 API
export const fetchJobPostingComments = async (targetId: string): Promise<JobPostingCommentListResponse> => {
  const response = await axiosInstance.get<JobPostingCommentListResponse>(`/comment/all/JOBPOSTING/${targetId}`);
  return response.data;
};

// 공고 댓글 작성 API
export const createJobPostingComment = async (data: CreateJobPostingCommentRequest): Promise<CreateJobPostingCommentResponse> => {
  const response = await axiosInstance.post<CreateJobPostingCommentResponse>(
    '/comment',
    data
  );
  return response.data;
};

// 공고 댓글 삭제 API
export const deleteJobPostingComment = async (commentId: string): Promise<DeleteJobPostingCommentResponse> => {
  const response = await axiosInstance.delete<DeleteJobPostingCommentResponse>(
    '/comment',
    { data: { commentId } }
  );
  return response.data;
};

// 게시물(커뮤니티) 댓글 전체 조회 API
export const fetchCommunityComments = async (targetId: string) => {
  const response = await axiosInstance.get<JobPostingCommentListResponse>(`/comment/all/COMMUNITY/${targetId}`);
  return response.data;
};

// 게시물(커뮤니티) 댓글 작성 API
export const createCommunityComment = async (data: CreateJobPostingCommentRequest) => {
  const response = await axiosInstance.post<CreateJobPostingCommentResponse>(
    '/comment',
    { ...data }
  );
  return response.data;
};

// 게시물(커뮤니티) 댓글 삭제 API
export const deleteCommunityComment = async (commentId: string) => {
  const response = await axiosInstance.delete<DeleteJobPostingCommentResponse>(
    '/comment',
    { data: { commentId } }
  );
  return response.data;
}; 