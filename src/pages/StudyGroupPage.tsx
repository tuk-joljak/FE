import { useEffect, useState } from "react";
import { fetchAllStudyGroups } from "@/api/studygroup";
import { StudyGroup } from "@/types/studygroup";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { StudyGroupModal } from "@/components/StudyGroup/StudyGroupModal";
import { StudyGroupCard } from "@/components/StudyGroup/StudyGroupCard";

export function StudyGroupPage() {
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState<StudyGroup | null>(null);

  const fetchStudyGroups = async () => {
    try {
      setLoading(true);
      const response = await fetchAllStudyGroups();

      if (response.success) {
        setStudyGroups(response.studyGroupList);
      } else {
        setError(response.message || "스터디 그룹 로딩 실패");
      }
    } catch (err) {
      setError("서버 연결 오류가 발생했습니다.");
      console.error("스터디 그룹 로딩 오류:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudyGroups();
  }, []);

  const handleOpenCreateModal = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (studyGroup: StudyGroup) => {
    setEditData(studyGroup);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    fetchStudyGroups();
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center py-12">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center py-12 text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
          스터디 그룹 목록
        </h1>
        <Button
          onClick={handleOpenCreateModal}
          className="flex items-center gap-2"
        >
          <Plus size={18} />
          <span>스터디 만들기</span>
        </Button>
      </div>

      {studyGroups.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <p>등록된 스터디 그룹이 없습니다.</p>
          <Button
            onClick={handleOpenCreateModal}
            variant="outline"
            className="mt-4"
          >
            첫 스터디 그룹 만들기
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studyGroups.map((studyGroup, index) => (
            <div key={index} onClick={() => handleOpenEditModal(studyGroup)}>
              <StudyGroupCard studyGroup={studyGroup} index={index} />
            </div>
          ))}
        </div>
      )}

      <StudyGroupModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
        editData={editData}
      />
    </div>
  );
}

export default StudyGroupPage;
