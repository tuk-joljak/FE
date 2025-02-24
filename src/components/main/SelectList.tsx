import { useRecruitmentStore } from "@/stores/main"; // Ensure this path is correct based on your project structure.

const SelectList = () => {
  // Destructure the needed functions and state from the store.
  const { currentCategory, setCurrentCategory, getAllCategories } =
    useRecruitmentStore();

  // Get all categories from the store.
  const allCategories = getAllCategories();

  // Handling category change event.
  const handleCategoryChange = (newCategory: string) => {
    // Type guard to ensure newCategory is of the correct type
    if (["popular", "frontend", "backend", "bookmark"].includes(newCategory)) {
      setCurrentCategory(
        newCategory as "popular" | "frontend" | "backend" | "bookmark"
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-between w-36 h-[300px]">
      {" "}
      {/* Adjusted for TailwindCSS */}
      {allCategories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`w-full py-3 my-1 text-white font-medium rounded-md transition-colors duration-300 ease-in-out ${
            currentCategory === category
              ? "bg-primary"
              : "bg-gray-400 hover:bg-gray-500"
          }`} // Using TailwindCSS for styling
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default SelectList;
