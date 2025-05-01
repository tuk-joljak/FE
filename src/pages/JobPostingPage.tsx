import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAllJobPostings } from "@/api/jobPosting";
import type { JobPosting } from "@/types/jobPosting";
import JobPostingList from "@/components/JobPosting/JobPostingList";
import FilterBar from "@/components/JobPosting/FilterBar";

const JobPostingPage = () => {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [filteredPostings, setFilteredPostings] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const loadJobPostings = async () => {
      try {
        const response = await fetchAllJobPostings();
        if (response.success) {
          setJobPostings(response.jobPostingList);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError("채용공고를 불러오는데 실패했습니다.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobPostings();
  }, []);

  // 검색어와 필터에 따라 게시물 필터링
  useEffect(() => {
    let result = [...jobPostings];
    const search = searchParams.get("search");
    const filter = searchParams.get("filter");

    // 검색어 필터링
    if (search) {
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.companyName.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 필터 적용
    if (filter) {
      switch (filter) {
        case "latest":
          result.sort((a, b) => (b.jobPostingId > a.jobPostingId ? 1 : -1));
          break;
        case "deadline":
          result = result.filter((post) => post.deadline !== null);
          result.sort((a, b) =>
            a.deadline && b.deadline
              ? new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
              : 0
          );
          break;
        case "noCareer":
          result = result.filter((post) => !post.career);
          break;
        case "newbie":
          result = result.filter(
            (post) =>
              post.location.includes("신입") ||
              (post.career && post.career.includes("신입"))
          );
          break;
      }
    }

    setFilteredPostings(result);
  }, [searchParams, jobPostings]);

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="space-y-6">
        <FilterBar />
        <JobPostingList
          jobPostings={filteredPostings}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default JobPostingPage;
