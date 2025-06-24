import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { StudyGroup } from "@/types/studygroup";
import { Link } from "react-router-dom";

interface StudyGroupCardProps {
  studyGroup: StudyGroup;
  index: number;
}

export function StudyGroupCard({ studyGroup, index }: StudyGroupCardProps) {
  const { studyGroupName, description, startDate, endDate } = studyGroup;

  // 스터디 제목 설정 (content가 없는 경우 기본값 제공)
  const title = studyGroupName || `스터디 그룹 ${index + 1}`;

  // 태그 관련 키워드 추출 로직
  const getTags = () => {
    const tags = ["스터디"];

    if (studyGroupName) {
      // 콘텐츠에서 키워드 추출 로직
      if (studyGroupName.includes("스프링")) tags.push("스프링");
      if (studyGroupName.includes("자바")) tags.push("자바");
      if (studyGroupName.includes("리액트")) tags.push("리액트");
      if (studyGroupName.includes("프론트엔드")) tags.push("프론트엔드");
      if (studyGroupName.includes("백엔드")) tags.push("백엔드");
    }

    return tags;
  };

  return (
    <Link to={`/study-group/${studyGroup.studyGroupId}`} className="block w-full h-full">
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="w-full h-full"
      >
        <Card className="h-[280px] hover:shadow-lg transition-shadow duration-200 border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-50 line-clamp-2">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-primary line-clamp-1">
                {startDate} ~ {endDate}
              </span>
              <Badge
                variant="secondary"
                className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                모집중
              </Badge>
            </div>
            <div className="flex gap-4 items-center text-sm text-slate-600 dark:text-slate-400">
              <span className="line-clamp-1">
                {description}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {getTags().map((tag, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
