// src/types/studyGroup.ts
export interface StudyGroup {
  content: string | null;
  startDate: string;
  endDate: string;
  studyGroupId?: string;
  studyGroupName?: string;
  category?: string;
}

export interface StudyGroupResponse {
  studyGroupList: StudyGroup[];
  success: boolean;
  message: string;
}

export interface StudyGroupUpdateRequest {
  studyGroupId: string;
  content: string;
  startDate: string;
  endDate: string;
}

export interface StudyGroupCreateRequest {
  userId: string;
  studyGroupName: string;
  category: string;
  content: string;
  startDate: string;
  endDate: string;
}
