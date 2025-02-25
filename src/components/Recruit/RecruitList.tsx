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

interface Recruit {
  id: number;
  companyName: string;
  position: string;
  experience: string;
  location: string;
  deadline: string;
}

const recruitments: Recruit[] = [
  {
    id: 1,
    companyName: "회사A",
    position: "Frontend Engineer(원년 사업)",
    experience: "경력 3년 이상",
    location: "서울",
    deadline: "상시 채용",
  },
  {
    id: 2,
    companyName: "회사B",
    position: "Backend Engineer(신사업)",
    experience: "경력 5-20년",
    location: "부산",
    deadline: "2022-12-31",
  },
];

export function RecruitList() {
  const navigate = useNavigate();
  return (
    <div className="mt-10 center">
      <div className="w-[1160px]">
        <Table>
          <TableCaption>최근 채용 공고 목록</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>기업명</TableHead>
              <TableHead>공고명</TableHead>
              <TableHead>필요경력</TableHead>
              <TableHead>근무지역</TableHead>
              <TableHead>마감일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recruitments.map((recruit) => (
              <TableRow
                key={recruit.id}
                onClick={() => navigate(`/${recruit.id}`)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{recruit.companyName}</TableCell>
                <TableCell>{recruit.position}</TableCell>
                <TableCell>{recruit.experience}</TableCell>
                <TableCell>{recruit.location}</TableCell>
                <TableCell>{recruit.deadline}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default RecruitList;
