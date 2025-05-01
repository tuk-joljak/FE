import { ResumeAnalysisResponse } from "@/types/resume";

interface ResumeAnalysisResultProps {
  analysis: ResumeAnalysisResponse | null;
}

const ResumeAnalysisResult = ({ analysis }: ResumeAnalysisResultProps) => {
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
              <span 
                key={index} 
                className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-full"
              >
                {skill}
              </span>
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
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start gap-4">
                  {job.imageUrl && (
                    <img 
                      src={job.imageUrl} 
                      alt={job.companyDAO.companyName} 
                      className="w-16 h-16 object-contain"
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
    </div>
  );
};

export default ResumeAnalysisResult; 