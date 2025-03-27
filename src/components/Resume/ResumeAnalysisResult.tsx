import { useNavigate } from "react-router-dom";
import type { ResumeAnalysisResponse } from "@/api/resume";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  BriefcaseIcon, 
  CheckCircle2, 
  LightbulbIcon, 
  AlertCircle 
} from "lucide-react";

interface ResumeAnalysisResultProps {
  analysis: ResumeAnalysisResponse;
}

const ResumeAnalysisResult = ({ analysis }: ResumeAnalysisResultProps) => {
  const navigate = useNavigate();
  console.log('ResumeAnalysisResult props:', analysis);
  return (
    <div className="space-y-6">
      {/* 스킬 비교 섹션 */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 보유 기술 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <CardTitle>보유 기술</CardTitle>
            </div>
            <CardDescription>현재 보유하고 있는 기술 스택</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysis.commonSkills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-green-800 bg-green-100 hover:bg-green-200">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 추천 학습 기술 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-yellow-500" />
              <CardTitle>추천 학습 기술</CardTitle>
            </div>
            <CardDescription>추가로 학습하면 좋을 기술 스택</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysis.missingSkills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-yellow-800 bg-yellow-100 hover:bg-yellow-200">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI 추천사항 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <LightbulbIcon className="w-5 h-5 text-blue-500" />
            <CardTitle>AI 추천사항</CardTitle>
          </div>
          <CardDescription>AI가 분석한 맞춤형 추천사항</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            {analysis.recommendations.map((recommendation, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <p className="leading-relaxed text-gray-700 whitespace-pre-line">
                  {recommendation}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 추천 채용공고 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BriefcaseIcon className="w-5 h-5 text-purple-500" />
            <CardTitle>추천 채용공고</CardTitle>
          </div>
          <CardDescription>보유 기술과 관련된 채용공고</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysis.recommendedJobs.map((job) => (
              <div
                key={job.jobPostingId}
                className="p-4 transition-all rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                onClick={() => navigate(`/jobposting/${job.jobPostingId}`)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-blue-600 hover:text-blue-700">
                      {job.title}
                    </h3>
                    {job.description && (
                      <p className="mt-1 text-sm text-gray-600">{job.description}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/jobposting/${job.jobPostingId}`);
                    }}
                  >
                    상세보기
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 주의사항 */}
      <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">분석 결과 안내</h4>
            <p className="mt-1 text-sm text-yellow-700">
              이 분석 결과는 AI가 제공한 참고용 정보입니다. 실제 채용 과정에서는 더 다양한 요소들이 고려될 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalysisResult; 