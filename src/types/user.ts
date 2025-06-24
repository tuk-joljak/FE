export interface SignUpRequest {
  mainUserName: string;
  loginId: string;
  password: string;
}

export interface SignUpResponse {
  mainUserId: string;
  success: boolean;
  message: string;
}

export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface LoginResponse {
  mainUserId: string;
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
}

// 유저 게시글 타입 (응답에 맞게 수정)
export interface UserPost {
  userPostId: string;
  postTitle: string;
  postContent: string;
  isFinish: boolean;
}

export interface UserPostListResponse {
  userPostList: UserPost[];
  success: boolean;
  message: string;
}

// 게시글 작성 요청/응답 타입
export interface CreateUserPostRequest {
  userId: string;
  postTitle: string;
  postContent: string;
}

export interface CreateUserPostResponse {
  success: boolean;
  userPostId: string;
  message: string;
}

export interface UserPostDetailResponse {
  success: boolean;
  message: string;
  userPostInfo: UserPost;
}

// 공고 댓글 타입
export interface JobPostingComment {
  commentId: string;
  userId: string;
  content: string;
}

export interface JobPostingCommentListResponse {
  responseCommentsGetDTOS: JobPostingComment[];
  success: boolean;
  message: string;
}

export interface CreateJobPostingCommentRequest {
  targetId: string;
  userId: string;
  content: string;
}

export interface CreateJobPostingCommentResponse {
  success: boolean;
  commentId: string;
  message: string;
}

export interface DeleteJobPostingCommentRequest {
  commentId: string;
}

export interface DeleteJobPostingCommentResponse {
  success: boolean;
  message: string;
}

export interface CreateUserScheduleRequest {
  userId: string;
  scheduleContent: string;
  startDate: string;
  endDate: string;
}

export interface CreateUserScheduleResponse {
  success: boolean;
  userScheduleId: string;
  message: string;
} 