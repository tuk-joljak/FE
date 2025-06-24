// src/types/studyGroup.ts
export interface StudyGroup {
  studyGroupId: string;
  studyGroupName: string;
  description: string;
  isRecruiting: boolean;
  startDate?: string;
  endDate?: string;
  techStacks?: string[];
  category?: string;
}

export interface StudyGroupResponse {
  studyGroupList: StudyGroup[];
  success: boolean;
  message: string;
}

export interface StudyGroupUpdateRequest {
  studyGroupId: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface StudyGroupCreateRequest {
  userId: string;
  studyGroupName: string;
  category: string;
  description: string;
  startDate: string;
  endDate: string;
}
