import {
  StudyGroupCreateRequest,
  StudyGroupResponse,
  StudyGroupUpdateRequest,
} from "@/types/studygroup";
import axiosInstance from "./axios";

export const fetchAllStudyGroups = async (): Promise<StudyGroupResponse> => {
  try {
    const response = await axiosInstance.get<StudyGroupResponse>(
      "/study/group/all"
    );
    return response.data;
  } catch (error) {
    console.error("스터디 그룹 조회 실패:", error);
    throw error;
  }
};

interface StudyGroupDetail {
  studyGroupId?: string;
  studyGroupName: string;
  description: string;
  startDate: string;
  endDate: string;
  isRecruiting: boolean;
  id?: string;
  title?: string;
  content?: string;
  maxMembers?: number;
  currentMembers?: number;
  createdAt?: string;
  leader?: {
    id: string;
    name: string;
  };
}

interface StudyGroupDetailResponse {
  success: boolean;
  message: string;
  studyGroupInfo: StudyGroupDetail;
}

export const fetchStudyGroupDetail = async (
  studyGroupId: string
): Promise<StudyGroupDetailResponse> => {
  try {
    const response = await axiosInstance.get<StudyGroupDetailResponse>(
      `/study/group/${studyGroupId}`
    );
    if (response.data && response.data.studyGroupInfo && !response.data.studyGroupInfo.studyGroupId) {
      response.data.studyGroupInfo.studyGroupId = studyGroupId;
    }
    return response.data;
  } catch (error) {
    console.error("스터디 그룹 상세 조회 실패:", error);
    throw error;
  }
};

interface StudyGroupUpdateResponse {
  success: boolean;
  message: string;
  studyGroupId: string;
}

export const updateStudyGroup = async (
  data: StudyGroupUpdateRequest
): Promise<StudyGroupUpdateResponse> => {
  try {
    const response = await axiosInstance.put<StudyGroupUpdateResponse>(
      "/study/group",
      data
    );
    return response.data;
  } catch (error) {
    console.error("스터디 그룹 수정 실패:", error);
    throw error;
  }
};

export const createStudyGroup = async (
  data: StudyGroupCreateRequest
): Promise<StudyGroupUpdateResponse> => {
  try {
    const response = await axiosInstance.post<StudyGroupUpdateResponse>(
      "/study/group",
      data
    );
    return response.data;
  } catch (error) {
    console.error("스터디 그룹 생성 실패:", error);
    throw error;
  }
};

// 미싱스킬로 스터디그룹 추천
export const fetchStudyGroupsByMissingSkills = async (missingSkills: string[]): Promise<StudyGroupResponse> => {
  const response = await axiosInstance.post<StudyGroupResponse>(
    "/study/group/missing/skills",
    { missingSkills }
  );
  return response.data;
};
