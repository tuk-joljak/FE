import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const FilterBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      searchParams.set("search", value);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  };

  const handleFilterClick = (filter: string) => {
    if (searchParams.get("filter") === filter) {
      searchParams.delete("filter");
    } else {
      searchParams.set("filter", filter);
    }
    setSearchParams(searchParams);
  };

  const currentFilter = searchParams.get("filter");

  return (
    <div className="px-4 mx-auto max-w-7xl">
      <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* 검색 섹션 */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Input
                type="text"
                placeholder="검색어를 입력하세요"
                className="w-full pl-10"
                value={searchParams.get("search") || ""}
                onChange={handleSearch}
              />
              <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            </div>
          </div>

          {/* 필터 버튼 그룹 */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className={`hover:bg-gray-100 ${
                currentFilter === "latest" ? "bg-gray-100 border-gray-400" : ""
              }`}
              onClick={() => handleFilterClick("latest")}
            >
              최신순
            </Button>
            <Button
              variant="outline"
              className={`hover:bg-gray-100 ${
                currentFilter === "deadline" ? "bg-gray-100 border-gray-400" : ""
              }`}
              onClick={() => handleFilterClick("deadline")}
            >
              마감임박순
            </Button>
            <Button
              variant="outline"
              className={`hover:bg-gray-100 ${
                currentFilter === "noCareer" ? "bg-gray-100 border-gray-400" : ""
              }`}
              onClick={() => handleFilterClick("noCareer")}
            >
              경력무관
            </Button>
            <Button
              variant="outline"
              className={`hover:bg-gray-100 ${
                currentFilter === "newbie" ? "bg-gray-100 border-gray-400" : ""
              }`}
              onClick={() => handleFilterClick("newbie")}
            >
              신입
            </Button>
          </div>
        </div>

        {/* 활성화된 필터 표시 */}
        {(searchParams.get("search") || currentFilter) && (
          <div className="flex flex-wrap gap-2 mt-4">
            {searchParams.get("search") && (
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                검색어: {searchParams.get("search")}
              </span>
            )}
            {currentFilter && (
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
                {currentFilter === "latest" && "최신순"}
                {currentFilter === "deadline" && "마감임박순"}
                {currentFilter === "noCareer" && "경력무관"}
                {currentFilter === "newbie" && "신입"}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
