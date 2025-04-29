import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, CalendarDays, Edit } from "lucide-react";
import { fetchStudyGroupDetail } from "@/api/studygroup";
import { StudyGroupModal } from "@/components/StudyGroup/StudyGroupModal";

interface StudyGroupDetailInfo {
  content: string | null;
  startDate: string;
  endDate: string;
  studyGroupId?: string;
}

export function StudyGroupDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [studyGroup, setStudyGroup] = useState<StudyGroupDetailInfo | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchStudyGroup = async () => {
      if (!id) {
        setError("스터디 그룹 ID가 유효하지 않습니다.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetchStudyGroupDetail(id);

        if (response.success) {
          setStudyGroup({
            ...response.studyGroupInfo,
            studyGroupId: id,
          });
        } else {
          setError(
            response.message || "스터디 그룹 정보를 불러오는데 실패했습니다."
          );
        }
      } catch (err) {
        setError("서버 연결 오류가 발생했습니다.");
        console.error("스터디 그룹 상세 조회 오류:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudyGroup();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSuccess = async () => {
    if (id) {
      try {
        setLoading(true);
        const response = await fetchStudyGroupDetail(id);

        if (response.success) {
          setStudyGroup({
            ...response.studyGroupInfo,
            studyGroupId: id,
          });
        }
      } catch (err) {
        console.error("스터디 그룹 새로고침 오류:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  // 키워드 기반 태그 추출 함수
  const getTags = (content: string | null) => {
    const tags = ["스터디"];

    if (content) {
      if (content.includes("스프링")) tags.push("스프링");
      if (content.includes("자바")) tags.push("자바");
      if (content.includes("리액트") || content.includes("React"))
        tags.push("리액트");
      if (content.includes("프론트엔드")) tags.push("프론트엔드");
      if (content.includes("백엔드")) tags.push("백엔드");
    }

    return tags;
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" className="mr-2">
            <ArrowLeft size={18} />
          </Button>
          <Skeleton className="h-8 w-64" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-12 w-full" />
            </div>
            <div>
              <Skeleton className="h-6 w-32 mb-2" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Button
          variant="ghost"
          onClick={handleGoBack}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          <span>뒤로 가기</span>
        </Button>
        <Card>
          <CardContent className="py-12">
            <div className="text-center text-red-500">
              <p className="text-xl">{error}</p>
              <Button variant="outline" onClick={handleGoBack} className="mt-4">
                목록으로 돌아가기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!studyGroup) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Button
          variant="ghost"
          onClick={handleGoBack}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          <span>뒤로 가기</span>
        </Button>
        <Card>
          <CardContent className="py-12">
            <div className="text-center text-slate-500">
              <p className="text-xl">스터디 그룹 정보를 찾을 수 없습니다.</p>
              <Button variant="outline" onClick={handleGoBack} className="mt-4">
                목록으로 돌아가기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const tags = getTags(studyGroup.content);

  return (
    <div className="container mx-auto py-8 px-4">
      <Button
        variant="ghost"
        onClick={handleGoBack}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft size={18} />
        <span>뒤로 가기</span>
      </Button>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl mb-2">
                {studyGroup.content || "스터디 그룹"}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <CalendarDays size={16} />
                <span>
                  {studyGroup.startDate} ~ {studyGroup.endDate}
                </span>
              </CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={handleEdit}
              className="flex items-center gap-2"
            >
              <Edit size={16} />
              <span>수정</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">스터디 내용</h3>
            <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line">
              {studyGroup.content || "스터디 내용이 없습니다."}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">태그</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full">참여 신청하기</Button>
        </CardFooter>
      </Card>

      {studyGroup && (
        <StudyGroupModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
          editData={studyGroup}
        />
      )}
    </div>
  );
}

export default StudyGroupDetailPage;
