import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchAllJobPostings } from "@/api/jobPosting";
import type { JobPosting } from "@/types/jobPosting";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80";

export function MainCarousel() {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchAllJobPostings();
        if (response.success) {
          setJobPostings(response.jobPostingList.slice(0, 5));
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
    <Carousel className="mx-auto w-full max-w-5xl">
      <CarouselContent>
        {jobPostings.map((job) => (
          <CarouselItem key={job.jobPostingId}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="p-1"
            >
              <Card className="overflow-hidden">
                <CardContent className="relative p-0">
                  <div className="relative h-[400px]">
                    <img
                      src={DEFAULT_IMAGE}
                      alt={job.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t to-transparent from-black/60" />
                    <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
                      <h3 className="mb-2 text-2xl font-bold">{job.title}</h3>
                      <p className="text-gray-200">{job.companyName}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}
