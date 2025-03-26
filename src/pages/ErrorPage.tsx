import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-4xl font-bold mb-4">
          {error.status} {error.statusText}
        </h1>
        <p className="text-gray-600 mb-4">{error.data?.message || "페이지를 찾을 수 없습니다."}</p>
        <Button onClick={() => navigate("/")}>홈으로 돌아가기</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">오류가 발생했습니다</h1>
      <p className="text-gray-600 mb-4">예상치 못한 오류가 발생했습니다. 다시 시도해주세요.</p>
      <Button onClick={() => navigate("/")}>홈으로 돌아가기</Button>
    </div>
  );
} 