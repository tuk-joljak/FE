import { useState } from "react";
import { analyzeResume } from "@/api/resume";
import type { ResumeAnalysisResponse } from "@/api/resume";
import { Upload } from "lucide-react";
import ResumeAnalysisResult from "@/components/Resume/ResumeAnalysisResult";

const ResumePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ResumeAnalysisResponse | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('PDF 파일만 업로드 가능합니다.');
      setFile(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!file) {
      setError('파일을 선택해주세요.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await analyzeResume(file);
      console.log('분석 결과:', response);
      setAnalysis(response);
    } catch (err) {
      console.error('에러 발생:', err);
      setError('이력서 분석 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-4xl px-4 mx-auto">
        <div className="p-8 mb-6 bg-white rounded-lg shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">
            이력서 분석
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-8 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="flex flex-col items-center justify-center">
                <Upload className="w-12 h-12 mb-4 text-gray-400" />
                <div className="text-center">
                  <label className="cursor-pointer">
                    <span className="px-4 py-2 mt-2 text-base leading-normal text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600">
                      PDF 파일 선택
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                {file && (
                  <div className="mt-4 text-sm text-gray-600">
                    선택된 파일: {file.name}
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-500">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!file || isLoading}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white 
                ${!file || isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
                } transition-colors`}
            >
              {isLoading ? '분석 중...' : '분석하기'}
            </button>
          </form>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="w-12 h-12 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="p-4 mt-4 border border-red-200 rounded-lg bg-red-50">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {analysis && <ResumeAnalysisResult analysis={analysis} />}
      </div>
    </div>
  );
};

export default ResumePage;
