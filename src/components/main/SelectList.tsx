import { useRecruitmentStore } from "@/stores/main";
import { motion } from "framer-motion";
import type { Category } from "@/stores/main";

const categories: Category[] = [
  "전체",
  "프론트엔드",
  "백엔드",
  "데이터 엔지니어",
  "DevOps",
  "AI/ML",
];

export function SelectList() {
  const { currentCategory, setCurrentCategory } = useRecruitmentStore();

  const handleCategoryChange = (category: Category) => {
    setCurrentCategory(category);
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleCategoryChange(category)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            currentCategory === category
              ? "bg-primary text-white"
              : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
          }`}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
}
