import axiosInstance from "./axios";
import {
  SignUpRequest,
  SignUpResponse,
  LoginResponse,
  UserPostListResponse,
  CreateUserPostRequest,
  CreateUserPostResponse,
  UserPostDetailResponse,
  CreateUserScheduleRequest,
  CreateUserScheduleResponse,
} from "@/types/user";
import type { AxiosResponse } from "axios";

// 회원가입 API
export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  const response = await axiosInstance.post<SignUpResponse>("/main/user", data);
  return response.data;
};

// 로그인 API (GET, 쿼리 파라미터)
export const login = async (
  loginId: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axiosInstance.get<LoginResponse>(
    `/main/user?login-id=${encodeURIComponent(
      loginId
    )}&password=${encodeURIComponent(password)}`
  );
  return response.data;
};

// 유저 게시판 전체 조회 API
export const fetchUserPosts = async (
  userId: string
): Promise<UserPostListResponse> => {
  const response = await axiosInstance.get<UserPostListResponse>(
    `/user/post/all/${userId}`
  );
  return response.data;
};

// 게시글 작성 API
export const createUserPost = async (
  data: CreateUserPostRequest
): Promise<CreateUserPostResponse> => {
  const response = await axiosInstance.post<CreateUserPostResponse>(
    "/user/post",
    data
  );
  return response.data;
};

// 특정 게시물 조회 API
export const fetchUserPostDetail = async (
  userPostId: string
): Promise<UserPostDetailResponse> => {
  try {
    const response = await axiosInstance.get<UserPostDetailResponse>(
      `/user/post/${userPostId}`
    );
    return response.data;
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "response" in error) {
      const err = error as { response?: { status?: number } };

      if (err.response?.status === 404) {
        throw new Error("게시물을 찾을 수 없습니다.");
      }
    }
    throw error;
  }
};

// 캘린더 일정 추가 API
export const createUserSchedule = async (
  data: CreateUserScheduleRequest
): Promise<CreateUserScheduleResponse> => {
  const response = await axiosInstance.post<CreateUserScheduleResponse>(
    "/user/schedule",
    data
  );
  return response.data;
};

// 일정 수정 API
export interface UpdateUserScheduleRequest {
  userScheduleId: string;
  scheduleContent: string;
  startDate: string;
  endDate: string;
}

export interface UpdateUserScheduleResponse {
  success: boolean;
  userScheduleId: string;
  message: string;
}

export const updateUserSchedule = async (
  data: UpdateUserScheduleRequest
): Promise<UpdateUserScheduleResponse> => {
  const res: AxiosResponse<UpdateUserScheduleResponse> =
    await axiosInstance.put("/user/schedule", data);
  return res.data;
};

// 일정 삭제 API
export interface DeleteUserScheduleRequest {
  userScheduleId: string;
}

export interface DeleteUserScheduleResponse {
  success: boolean;
  userScheduleId: string;
  message: string;
}

export const deleteUserSchedule = async (
  data: DeleteUserScheduleRequest
): Promise<DeleteUserScheduleResponse> => {
  const res = await axiosInstance.delete<DeleteUserScheduleResponse>(
    "/user/schedule",
    { data }
  );
  return res.data;
};
