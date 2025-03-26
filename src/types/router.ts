export interface RecruitDetailParams {
  id: string;
  [key: string]: string | undefined;
}

export interface RouterParams {
  recruit: {
    detail: RecruitDetailParams;
  };
} 