import { useState } from "react";
import { ResumeAnalysisResponse } from "@/types/resume";
import { fetchStudyGroupsByMissingSkills } from "@/api/studygroup";
import type { StudyGroup } from "@/types/studygroup";

interface ResumeAnalysisResultProps {
  analysis: ResumeAnalysisResponse | null;
}

const ResumeAnalysisResult = ({ analysis }: ResumeAnalysisResultProps) => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSkillClick = async (skill: string) => {
    setSelectedSkill(skill);
    setShowModal(true);
    setLoading(true);
    setError(null);
    try {
      const res = await fetchStudyGroupsByMissingSkills([skill]);
      setStudyGroups(res.studyGroupList || []);
    } catch {
      setError("스터디 그룹을 불러오지 못했습니다.");
      setStudyGroups([]);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSkill(null);
    setStudyGroups([]);
    setError(null);
  };

  if (!analysis) {
    return (
      <div className="p-8 mt-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">이력서 분석 결과</h2>
        <p className="text-gray-600">분석 결과를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="p-8 mt-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">이력서 분석 결과</h2>
      <div className="space-y-6">
        {/* 공통 스킬 */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-800">보유 스킬</h3>
          <div className="flex flex-wrap gap-2">
            {analysis.commonSkills.map((skill, index) => (
              <span 
                key={index} 
                className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        {/* 부족한 스킬 */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-800">추가 학습이 필요한 스킬</h3>
          <div className="flex flex-wrap gap-2">
            {analysis.missingSkills.map((skill, index) => (
              <button
                key={index}
                className={`px-3 py-1 text-sm font-medium rounded-full border transition
                  ${selectedSkill === skill && showModal ? "bg-red-600 text-white border-red-700" : "bg-red-500 text-white border-red-600 hover:bg-red-600"}`}
                onClick={() => handleSkillClick(skill)}
                type="button"
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
        {/* 추천 사항 */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-800">추천 사항</h3>
          <ul className="space-y-2">
            {analysis.recommendations.map((recommendation, index) => (
              <li key={index} className="p-3 text-gray-700 bg-gray-50 rounded-lg">
                {recommendation}
              </li>
            ))}
          </ul>
        </div>
        {/* 추천 채용공고 */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-gray-800">추천 채용공고</h3>
          <div className="space-y-4">
            {analysis.recommendedJobs.map((job, index) => (
              <div key={index} className="p-4 rounded-lg border border-gray-200">
                <div className="flex gap-4 items-start">
                  {job.imageUrl && (
                    <img 
                      src={job.imageUrl} 
                      alt={job.companyDAO.companyName} 
                      className="object-contain w-16 h-16"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">{job.title}</h4>
                    <p className="text-sm text-gray-600">{job.companyDAO.companyName}</p>
                    <p className="text-sm text-gray-500">{job.location}</p>
                    {job.task && (
                      <div className="mt-2">
                        <h5 className="font-medium text-gray-800">주요 업무</h5>
                        <p className="text-sm text-gray-700 whitespace-pre-line">{job.task}</p>
                      </div>
                    )}
                    {job.qualification && (
                      <div className="mt-2">
                        <h5 className="font-medium text-gray-800">자격 요건</h5>
                        <p className="text-sm text-gray-700 whitespace-pre-line">{job.qualification}</p>
                      </div>
                    )}
                    {job.stack && (
                      <div className="mt-2">
                        <h5 className="font-medium text-gray-800">기술 스택</h5>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {job.stack.split(", ").map((tech, techIndex) => (
                            <span 
                              key={techIndex} 
                              className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 추천 스터디그룹 모달 */}
      {showModal && (
        <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-40">
          <div className="relative p-6 w-full max-w-lg bg-white rounded-lg shadow-lg">
            <button
              className="absolute top-3 right-3 text-2xl font-bold text-gray-400 hover:text-gray-700"
              onClick={closeModal}
              aria-label="닫기"
            >
              ×
            </button>
            <h4 className="mb-3 text-lg font-semibold text-gray-800">
              "{selectedSkill}" 관련 추천 스터디그룹
            </h4>
            {loading && <div className="text-gray-500">불러오는 중...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {!loading && !error && studyGroups.length === 0 && (
              <div className="text-gray-500">추천 스터디그룹이 없습니다.</div>
            )}
            <ul className="overflow-y-auto space-y-3 max-h-80">
              {studyGroups.map((group, idx) => (
                <li key={group.studyGroupId || idx} className="p-3 bg-white rounded-lg border shadow-sm">
                  <div className="mb-1 font-bold text-primary-700">{group.studyGroupName}</div>
                  <div className="mb-1 text-sm text-gray-700">{group.description}</div>
                  <div className="flex flex-wrap gap-1 mb-1">
                    {group.techStacks && group.techStacks.map((tech: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">{tech}</span>
                    ))}
                  </div>
                  {group.isRecruiting === false && (
                    <span className="text-xs text-gray-400">모집 마감</span>
                  )}
                  {group.isRecruiting === true && (
                    <span className="text-xs text-green-600">모집 중</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalysisResult; 