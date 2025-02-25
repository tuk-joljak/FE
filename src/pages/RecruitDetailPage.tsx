import { useParams } from "react-router-dom";

const RecruitDetailPage = () => {
  const { id } = useParams();
  return <div>Recruitment Details for ID: {id}</div>;
};

export default RecruitDetailPage;
