import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useNavigate } from "react-router-dom";

interface JobPosting {
  jobPostingId: string;
  title: string;
  career: string | null;
  deadline: string | null;
  companyName: string;
  location: string;
}

interface JobPostingListProps {
  jobPostings: JobPosting[];
  isLoading: boolean;
  error: string | null;
}

export function JobPostingList({ jobPostings = [], isLoading, error }: JobPostingListProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-12 h-12 rounded-full border-b-2 border-gray-900 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-red-500">에러: {error}</div>
      </div>
    );
  }

  if (!jobPostings || jobPostings.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-gray-500">등록된 채용공고가 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl">
      <div className="overflow-hidden bg-white rounded-lg shadow-md">
        <Table>
          <TableCaption className="mb-4 text-lg font-semibold">
            최근 채용 공고 목록
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="px-6 py-4 w-1/5 text-gray-700">기업명</TableHead>
              <TableHead className="px-6 py-4 w-2/5 text-gray-700">공고명</TableHead>
              <TableHead className="px-6 py-4 w-1/5 text-gray-700">근무지역</TableHead>
              <TableHead className="px-6 py-4 w-1/5 text-gray-700">마감일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobPostings.map((posting) => (
              <TableRow
                key={posting.jobPostingId}
                onClick={() => navigate(`/jobposting/${posting.jobPostingId}`)}
                className="border-b transition-colors cursor-pointer hover:bg-gray-50"
              >
                <TableCell className="px-6 py-4">
                  <div className="font-medium text-gray-900">{posting.companyName}</div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="text-blue-600 hover:text-blue-800">{posting.title}</div>
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-600">
                  {posting.location}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="text-gray-600">
                    {posting.deadline || 
                      <span className="text-green-600">상시채용</span>
                    }
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default JobPostingList;
