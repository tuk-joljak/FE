import { MainRecruitCard } from "./MainRecruitCard";
import { useEffect, useState } from "react";
import { fetchAllJobPostings } from "@/api/jobPosting";
import type { JobPosting } from "@/types/jobPosting";

const MainRecruitList = () => {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchAllJobPostings();
        if (response.success) {
          setJobPostings(response.jobPostingList);
        } else {
          setError(response.message || "채용공고를 불러오지 못했습니다.");
        }
      } catch {
        setError("서버 연결 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="py-8 text-center">로딩 중...</div>;
  }
  if (error) {
    return <div className="py-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {jobPostings.slice(0, 5).map((job) => (
        <MainRecruitCard
          key={job.jobPostingId}
          title={job.title}
          company={job.companyName}
          location={job.location}
        />
      ))}
    </div>
  );
};

export default MainRecruitList;
