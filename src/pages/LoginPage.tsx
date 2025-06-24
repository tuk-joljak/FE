import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/api/user";

function isAxiosError(error: unknown): error is { response?: { data?: { message?: string } } } {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: unknown }).response === "object"
  );
}

const LoginPage = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await login(loginId, password);
      if (res.success) {
        localStorage.setItem("mainUserId", res.mainUserId);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        navigate("/", { replace: true, state: { message: "로그인 성공!" } });
      } else {
        setError(res.message || "로그인에 실패했습니다.");
      }
    } catch (err: unknown) {
      let message = "로그인 중 오류가 발생했습니다.";
      if (isAxiosError(err)) {
        const response = err.response;
        if (response && response.data && typeof response.data.message === "string") {
          message = response.data.message;
        }
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center p-8 space-y-6 w-full max-w-sm bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">로그인</h2>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <Input
            name="loginId"
            placeholder="아이디"
            value={loginId}
            onChange={e => setLoginId(e.target.value)}
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-sm text-center text-red-500">{error}</div>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "로그인 중..." : "로그인"}
          </Button>
        </form>
        <div className="text-center text-sm text-gray-600">
          계정이 없으신가요?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
