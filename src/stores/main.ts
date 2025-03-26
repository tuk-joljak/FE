import { create } from "zustand";

export type Category = "전체" | "프론트엔드" | "백엔드" | "데이터 엔지니어" | "DevOps" | "AI/ML";

interface RecruitmentCategory {
  currentCategory: Category;
}

type RecruitmentStoreState = {
  currentCategory: RecruitmentCategory["currentCategory"];
  setCurrentCategory: (newCategory: Category) => void;
  getAllCategories: () => Category[];
};

export const useRecruitmentStore = create<RecruitmentStoreState>((set) => ({
  currentCategory: "전체",
  setCurrentCategory: (newCategory) => set({ currentCategory: newCategory }),
  getAllCategories: () => ["전체", "프론트엔드", "백엔드", "데이터 엔지니어", "DevOps", "AI/ML"],
}));
