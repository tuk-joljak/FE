import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signUp } from "@/api/user";
import { SignUpRequest } from "@/types/user";

const SignUpPage = () => {
  const [formData, setFormData] = useState<SignUpRequest>({
    mainUserName: "",
    loginId: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // 에러 메시지 초기화
    if (error) setError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.mainUserName.trim()) {
      setError("이름을 입력해주세요.");
      return false;
    }
    if (!formData.loginId.trim()) {
      setError("아이디를 입력해주세요.");
      return false;
    }
    if (formData.loginId.length < 3) {
      setError("아이디는 3자 이상이어야 합니다.");
      return false;
    }
    if (!formData.password) {
      setError("비밀번호를 입력해주세요.");
      return false;
    }
    if (formData.password.length < 4) {
      setError("비밀번호는 4자 이상이어야 합니다.");
      return false;
    }
    if (formData.password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await signUp(formData);
      
      if (response.success) {
        // mainUserId를 로컬 스토리지에 저장
        localStorage.setItem("mainUserId", response.mainUserId);
        localStorage.setItem("userName", formData.mainUserName);
        
        // 회원가입 성공 후 메인 페이지로 이동
        navigate("/", { 
          replace: true,
          state: { message: "회원가입이 완료되었습니다!" }
        });
      } else {
        setError(response.message || "회원가입에 실패했습니다.");
      }
    } catch (err: any) {
      console.error("회원가입 에러:", err);
      setError(err.response?.data?.message || "회원가입 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">회원가입</CardTitle>
          <CardDescription className="text-center">
            계정을 생성하여 서비스를 이용해보세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mainUserName">이름</Label>
              <Input
                id="mainUserName"
                name="mainUserName"
                type="text"
                placeholder="이름을 입력하세요"
                value={formData.mainUserName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="loginId">아이디</Label>
              <Input
                id="loginId"
                name="loginId"
                type="text"
                placeholder="아이디를 입력하세요"
                value={formData.loginId}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="text-sm text-red-500 text-center">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? "가입 중..." : "회원가입"}
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            이미 계정이 있으신가요?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              로그인하기
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage; 