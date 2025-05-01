// src/components/StudyGroup/StudyGroupModal.tsx
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createStudyGroup, updateStudyGroup } from "@/api/studygroup";
import { StudyGroup } from "@/types/studygroup";

// 임시 사용자 ID (실제로는 로그인 시스템에서 가져와야 함)
const CURRENT_USER_ID = "3f7a1c68-4d9d-48f3-b96b-9e5b1f1ea1a6";

interface StudyGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newStudyGroupId?: string) => void;
  editData?: StudyGroup | null;
}

export function StudyGroupModal({
  isOpen,
  onClose,
  onSuccess,
  editData,
}: StudyGroupModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    studyGroupName: "",
    category: "spring",
    content: "",
    startDate: "",
    endDate: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (editData) {
      setFormData({
        studyGroupName: editData.studyGroupName || "",
        category: editData.category || "spring",
        content: editData.content || "",
        startDate: editData.startDate || "",
        endDate: editData.endDate || "",
      });
    } else {
      setFormData({
        studyGroupName: "",
        category: "spring",
        content: "",
        startDate: "",
        endDate: "",
      });
    }
    setErrorMessage(null);
  }, [editData, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      setIsSubmitting(true);

      if (editData?.studyGroupId) {
        // 수정: studyGroupId와 필요한 필드만 전송
        await updateStudyGroup({
          studyGroupId: editData.studyGroupId,
          content: formData.content,
          startDate: formData.startDate,
          endDate: formData.endDate,
        });
        onSuccess();
      } else {
        // 생성: 모든 필수 필드 전송
        const response = await createStudyGroup({
          userId: CURRENT_USER_ID, // 실제 앱에서는 로그인된 사용자 ID 사용
          studyGroupName: formData.studyGroupName,
          category: formData.category,
          content: formData.content,
          startDate: formData.startDate,
          endDate: formData.endDate,
        });

        // 생성 성공 시 ID 전달
        if (response.success && response.studyGroupId) {
          onSuccess(response.studyGroupId);
        } else {
          onSuccess();
        }
      }

      onClose();
    } catch (error) {
      console.error("스터디 그룹 저장 에러:", error);
      setErrorMessage("스터디 그룹 저장 중 문제가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editData ? "스터디 그룹 수정" : "스터디 그룹 생성"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
              {errorMessage}
            </div>
          )}
          <div className="grid gap-4 py-4">
            {/* 스터디명 - 생성 시에만 표시 */}
            {!editData && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="studyGroupName" className="text-right">
                  스터디명
                </Label>
                <Input
                  id="studyGroupName"
                  name="studyGroupName"
                  value={formData.studyGroupName}
                  onChange={handleChange}
                  className="col-span-3"
                  placeholder="스터디 이름을 입력하세요"
                  required
                />
              </div>
            )}

            {/* 카테고리 - 생성 시에만 표시 */}
            {!editData && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  카테고리
                </Label>
                <div className="col-span-3">
                  <Select
                    value={formData.category}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spring">Spring</SelectItem>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="database">Database</SelectItem>
                      <SelectItem value="etc">기타</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* 스터디 내용 */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                스터디 내용
              </Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="col-span-3"
                placeholder="스터디 내용을 입력하세요"
                required
              />
            </div>

            {/* 시작일 */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                시작일
              </Label>
              <Input
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="col-span-3"
                placeholder="MM.DD (예: 04.27)"
                required
              />
            </div>

            {/* 종료일 */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">
                종료일
              </Label>
              <Input
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="col-span-3"
                placeholder="MM.DD (예: 04.29)"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              취소
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "처리 중..." : editData ? "수정하기" : "생성하기"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
