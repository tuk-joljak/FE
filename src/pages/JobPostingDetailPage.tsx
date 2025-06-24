import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJobPostingDetail, fetchJobPostingComments, createJobPostingComment, deleteJobPostingComment } from "@/api/jobPosting";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Building2,
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
  Share2,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { motion } from "framer-motion";
import type { JobPostingComment } from "@/types/user";

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
  const [comments, setComments] = useState<JobPostingComment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState("");
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [commentSubmitError, setCommentSubmitError] = useState<string | null>(null);
  const userId = localStorage.getItem("mainUserId");

  useEffect(() => {
    console.log("상세페이지 진입, id:", id);
    const loadJobPostingDetail = async () => {
      if (!id) {
        console.log("id 없음, 요청 안함");
        return;
      }
      try {
        setIsLoading(true);
        console.log("fetchJobPostingDetail 요청:", id);
        const response = await fetchJobPostingDetail(id);
        console.log("fetchJobPostingDetail 응답:", response);
        if (response.success) {
          setJobPosting(response.jobPostingInfo);
        } else {
          setError(response.message);
        }
      } catch (err) {
        console.error("상세 조회 에러:", err);
        setError(err as string);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobPostingDetail();

    // 댓글 불러오기
    if (id) {
      setCommentsLoading(true);
      setCommentsError(null);
      fetchJobPostingComments(id)
        .then((res) => {
          if (res.success) {
            setComments(res.responseCommentsGetDTOS);
          } else {
            setCommentsError(res.message);
          }
        })
        .catch((err) => {
          console.error("댓글 조회 에러:", err);
          setCommentsError("댓글을 불러오지 못했습니다.");
        })
        .finally(() => setCommentsLoading(false));
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 rounded-full border-b-2 border-gray-900 animate-spin"></div>
      </div>
    );
  }

  if (error || !jobPosting) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-500">
          {error || "채용공고를 찾을 수 없습니다."}
        </div>
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

  // 댓글 등록 핸들러
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !userId) return;
    if (!commentInput.trim()) {
      setCommentSubmitError("댓글을 입력하세요.");
      return;
    }
    setCommentSubmitting(true);
    setCommentSubmitError(null);
    try {
      const res = await createJobPostingComment({
        targetId: id,
        userId,
        content: commentInput.trim(),
      });
      if (res.success) {
        setCommentInput("");
        // 댓글 목록 새로고침
        setCommentsLoading(true);
        fetchJobPostingComments(id)
          .then((res) => {
            if (res.success) setComments(res.responseCommentsGetDTOS);
          })
          .finally(() => setCommentsLoading(false));
      } else {
        setCommentSubmitError(res.message || "댓글 등록에 실패했습니다.");
      }
    } catch {
      setCommentSubmitError("댓글 등록 중 오류가 발생했습니다.");
    } finally {
      setCommentSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentIdx: number) => {
    if (!id) return;
    const comment = comments[commentIdx];
    if (!comment) return;
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
    try {
      await deleteJobPostingComment(comment.commentId);
      // 삭제 후 목록 새로고침
      setCommentsLoading(true);
      fetchJobPostingComments(id)
        .then((res) => {
          if (res.success) setComments(res.responseCommentsGetDTOS);
        })
        .finally(() => setCommentsLoading(false));
    } catch {
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="py-8 min-h-screen bg-gray-50">
      <div className="px-4 mx-auto max-w-4xl">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <div className="flex justify-end mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mr-2"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
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
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    [{jobPosting.companyName}] {jobPosting.title}
                  </h1>
                  <Badge variant="secondary" className="px-4 py-1 text-lg">
                    정규직
                  </Badge>
                </div>

                <div className="flex gap-4 items-center text-gray-600 dark:text-gray-300">
                  <a
                    href="/company/MjIwODE2MzE4OQ==?company_nm=스콥정보통신"
                    className="flex gap-2 items-center transition-colors hover:text-primary"
                  >
                    <Building2 className="w-5 h-5" />
                    <span>{jobPosting.companyName}</span>
                  </a>
                  <div className="flex gap-2 items-center">
                    <MapPin className="w-5 h-5" />
                    <span>{jobPosting.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-sm">
                    🚆3호선 역세권 기업
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    <a
                      href="/positions?tag=FREE_DRESS"
                      className="hover:text-primary"
                    >
                      #자유복장
                    </a>
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    <a
                      href="/positions?tag=FREE_BOOK"
                      className="hover:text-primary"
                    >
                      #도서구입비지원
                    </a>
                  </Badge>
                </div>
              </div>

              <Separator className="my-6" />

              {/* 상세 정보 섹션 */}
              <div className="space-y-8">
                {/* 기술 스택 */}
                <section>
                  <h2 className="flex gap-2 items-center mb-4 text-2xl font-semibold dark:text-white">
                    <Briefcase className="w-6 h-6" />
                    기술 스택
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {jobPosting.stack.split(",").map((tech) => (
                      <div className="flex gap-2 items-center">
                        <img
                          alt={tech}
                          src={`https://img.shields.io/badge/${encodeURIComponent(
                            tech
                          )}-informational?style=flat&logo=${encodeURIComponent(
                            tech
                          )}&logoColor=white`}
                          className="rounded-sm h-[30px]"
                        />
                      </div>
                    ))}
                  </div>
                </section>

                {/* 주요 업무 */}
                <section>
                  <h2 className="mb-4 text-2xl font-semibold dark:text-white">
                    주요 업무
                  </h2>
                  <div className="text-gray-700 whitespace-pre-line">
                    {jobPosting.task}
                  </div>
                </section>

                {/* 자격 요건 */}
                <section>
                  <h2 className="flex gap-2 items-center mb-4 text-2xl font-semibold dark:text-white">
                    <GraduationCap className="w-6 h-6" />
                    자격 요건
                  </h2>
                  <div className="text-gray-700 whitespace-pre-line">
                    {jobPosting.qualification}
                  </div>
                </section>

                {/* 우대사항 */}
                {jobPosting.preference !== "-" && (
                  <section>
                    <h2 className="mb-4 text-2xl font-semibold dark:text-white">
                      우대사항
                    </h2>
                    <div className="text-gray-700 whitespace-pre-line">
                      {jobPosting.preference}
                    </div>
                  </section>
                )}

                {/* 복지 및 혜택 */}
                <section>
                  <h2 className="flex gap-2 items-center mb-4 text-2xl font-semibold dark:text-white">
                    <Heart className="w-6 h-6" />
                    복지 및 혜택
                  </h2>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Culture
                      </h3>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• 탄력근무제, 재택근무</li>
                        <li>• 워라벨 중시 (9to6 지향)</li>
                        <li>• 자율복장</li>
                        <li>• 여름휴가(3일) 및 휴가비</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Benefit
                      </h3>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• 장기근속자 포상</li>
                        <li>• 교육비/자격증 지원</li>
                        <li>• 성과급</li>
                        <li>• 통신비/야근식사</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Health & Family
                      </h3>
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
                  <h2 className="mb-4 text-2xl font-semibold dark:text-white">
                    채용절차
                  </h2>
                  <div className="text-gray-700">
                    {jobPosting.hiringProcess}
                  </div>
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

          {/* 댓글 리스트 */}
          <div className="mt-12">
            <h3 className="mb-4 text-xl font-bold text-gray-800">댓글</h3>
            {/* 댓글 입력창 */}
            <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-6">
              <input
                className="flex-1 px-3 py-2 rounded border focus:outline-none focus:ring"
                placeholder="댓글을 입력하세요"
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                maxLength={500}
                disabled={commentSubmitting}
              />
              <Button type="submit" disabled={commentSubmitting || !userId}>
                {commentSubmitting ? "등록 중..." : "등록"}
              </Button>
            </form>
            {commentSubmitError && (
              <div className="mb-4 text-sm text-center text-red-500">{commentSubmitError}</div>
            )}
            {commentsLoading ? (
              <div className="text-gray-500">불러오는 중...</div>
            ) : commentsError ? (
              <div className="text-red-500">{commentsError}</div>
            ) : comments.length === 0 ? (
              <div className="text-gray-500">댓글이 없습니다.</div>
            ) : (
              <ul className="space-y-3">
                {comments.map((comment, idx) => {
                  console.log("mainUserId:", userId, "commentUserId:", comment.userId, "commentId:", comment.commentId);
                  return (
                    <li key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded border">
                      <div>
                        <div className="text-sm text-gray-700">{comment.content}</div>
                        <div className="mt-1 text-xs text-gray-400">작성자: {comment.userId}</div>
                      </div>
                      {userId === comment.userId && comment.commentId && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="ml-2 text-xs text-red-500 border-red-300 hover:bg-red-50"
                          onClick={() => handleDeleteComment(idx)}
                        >
                          삭제
                        </Button>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingDetailPage;
