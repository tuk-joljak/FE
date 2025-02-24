import { create } from "zustand";

interface RecruitmentCategory {
  currentCategory: "popular" | "frontend" | "backend" | "bookmark";
}

type RecruitmentStoreState = {
  currentCategory: RecruitmentCategory["currentCategory"];
  setCurrentCategory: (
    newCategory: RecruitmentCategory["currentCategory"]
  ) => void;
  getAllCategories: () => RecruitmentCategory["currentCategory"][]; // 모든 카테고리를 반환하는 함수
};

export const useRecruitmentStore = create<RecruitmentStoreState>((set) => ({
  currentCategory: "popular",
  setCurrentCategory: (newCategory) => set({ currentCategory: newCategory }),
  getAllCategories: () => ["popular", "frontend", "backend", "bookmark"], // 모든 카테고리 반환
}));
