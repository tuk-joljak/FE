import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJobPostingDetail } from "@/api/jobPosting";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Briefcase, GraduationCap, Heart, Share2, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { motion } from "framer-motion";

interface JobPostingDetail {
  title: string;
  companyName: string;
  location: string;
  career: string | null;
  task: string;
  qualification: string;
  preference: string;
  deadline: string | null;
  stack: string;
  hiringProcess: string;
}

const JobPostingDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { theme, setTheme } = useTheme();
  const [jobPosting, setJobPosting] = useState<JobPostingDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    const loadJobPostingDetail = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const response = await fetchJobPostingDetail(id);
        if (response.success) {
          setJobPosting(response.jobPostingInfo);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err as string);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobPostingDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !jobPosting) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">{error || "채용공고를 찾을 수 없습니다."}</div>
      </div>
    );
  }

  const handleApply = () => {
    setIsApplying(true);
    // 지원하기 로직 구현
    setTimeout(() => setIsApplying(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: jobPosting.title,
          text: "스콥정보통신에서 리눅스서버 SW 개발자를 채용합니다.",
          url: window.location.href,
        });
      } catch (error) {
        console.error("공유하기 실패:", error);
      }
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-4xl px-4 mx-auto">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <div className="flex justify-end mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mr-2"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 dark:bg-gray-800">
              {/* 헤더 섹션 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">[{jobPosting.companyName}] {jobPosting.title}</h1>
                  <Badge variant="secondary" className="px-4 py-1 text-lg">
                    정규직
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                  <a
                    href="/company/MjIwODE2MzE4OQ==?company_nm=스콥정보통신"
                    className="flex items-center gap-2 transition-colors hover:text-primary"
                  >
                    <Building2 className="w-5 h-5" />
                    <span>{jobPosting.companyName}</span>
                  </a>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{jobPosting.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-sm">
                    🚆3호선 역세권 기업
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    <a href="/positions?tag=FREE_DRESS" className="hover:text-primary">#자유복장</a>
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    <a href="/positions?tag=FREE_BOOK" className="hover:text-primary">#도서구입비지원</a>
                  </Badge>
                </div>
              </div>

              <Separator className="my-6" />

              {/* 상세 정보 섹션 */}
              <div className="space-y-8">
                {/* 기술 스택 */}
                <section>
                  <h2 className="flex items-center gap-2 mb-4 text-2xl font-semibold dark:text-white">
                    <Briefcase className="w-6 h-6" />
                    기술 스택
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {jobPosting.stack.split(',').map((tech) => (
                      <Badge key={tech} variant="outline" className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <img
                            alt={tech}
                            height="20"
                            width="20"
                            src={`https://cdn.jumpit.co.kr/images/stacks/${tech}.png`}
                            className="rounded-sm"
                          />
                          {tech}
                        </div>
                      </Badge>
                    ))}
                  </div>
                </section>

                {/* 주요 업무 */}
                <section>
                  <h2 className="mb-4 text-2xl font-semibold dark:text-white">주요 업무</h2>
                  <div className="text-gray-700 whitespace-pre-line">{jobPosting.task}</div>
                </section>

                {/* 자격 요건 */}
                <section>
                  <h2 className="flex items-center gap-2 mb-4 text-2xl font-semibold dark:text-white">
                    <GraduationCap className="w-6 h-6" />
                    자격 요건
                  </h2>
                  <div className="text-gray-700 whitespace-pre-line">{jobPosting.qualification}</div>
                </section>

                {/* 우대사항 */}
                {jobPosting.preference !== "-" && (
                  <section>
                    <h2 className="mb-4 text-2xl font-semibold dark:text-white">우대사항</h2>
                    <div className="text-gray-700 whitespace-pre-line">{jobPosting.preference}</div>
                  </section>
                )}

                {/* 복지 및 혜택 */}
                <section>
                  <h2 className="flex items-center gap-2 mb-4 text-2xl font-semibold dark:text-white">
                    <Heart className="w-6 h-6" />
                    복지 및 혜택
                  </h2>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">Culture</h3>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• 탄력근무제, 재택근무</li>
                        <li>• 워라벨 중시 (9to6 지향)</li>
                        <li>• 자율복장</li>
                        <li>• 여름휴가(3일) 및 휴가비</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">Benefit</h3>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• 장기근속자 포상</li>
                        <li>• 교육비/자격증 지원</li>
                        <li>• 성과급</li>
                        <li>• 통신비/야근식사</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">Health & Family</h3>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• 종합건강검진</li>
                        <li>• 경조사비 지원</li>
                        <li>• 명절 선물</li>
                        <li>• 생일축하금</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* 채용절차 */}
                <section>
                  <h2 className="mb-4 text-2xl font-semibold dark:text-white">채용절차</h2>
                  <div className="text-gray-700">{jobPosting.hiringProcess}</div>
                </section>
              </div>

              {/* 지원하기 버튼 */}
              <div className="flex justify-center mt-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg"
                    onClick={handleApply}
                    disabled={isApplying}
                  >
                    {isApplying ? "지원 중..." : "지원하기"}
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingDetailPage;
