import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { RecruitDetailParams } from "@/types/router";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Briefcase, GraduationCap, Heart, Share2, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { motion } from "framer-motion";
import { useState } from "react";

const RecruitDetailPage = () => {
  const { id } = useParams<RecruitDetailParams>();
  const { theme, setTheme } = useTheme();
  const [isApplying, setIsApplying] = useState(false);

  if (!id) {
    return <div>잘못된 접근입니다.</div>;
  }

  const handleApply = () => {
    setIsApplying(true);
    // 지원하기 로직 구현
    setTimeout(() => setIsApplying(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "리눅스서버 SW 개발자 채용",
          text: "스콥정보통신에서 리눅스서버 SW 개발자를 채용합니다.",
          url: window.location.href,
        });
      } catch (error) {
        console.error("공유하기 실패:", error);
      }
    }
  };

  if (id === "1") {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="mr-2"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={handleShare}>
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 dark:bg-gray-800">
            {/* 헤더 섹션 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">리눅스서버 SW 개발자 채용</h1>
                <Badge variant="secondary" className="text-lg px-4 py-1">
                  정규직
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                <a
                  href="/company/MjIwODE2MzE4OQ==?company_nm=스콥정보통신"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Building2 className="w-5 h-5" />
                  <span>스콥정보통신</span>
                </a>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>서울특별시</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-sm">
                  🚆3호선 역세권 기업
                </Badge>
                <Badge variant="outline" className="text-sm">
                  <a href="/positions?tag=FREE_DRESS" className="hover:text-primary">#자유복장</a>
                </Badge>
                <Badge variant="outline" className="text-sm">
                  <a href="/positions?tag=FREE_BOOK" className="hover:text-primary">#도서구입비지원</a>
                </Badge>
              </div>
            </div>

            <Separator className="my-6" />

            {/* 상세 정보 섹션 */}
            <div className="space-y-8">
              {/* 기술 스택 */}
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 dark:text-white">
                  <Briefcase className="w-6 h-6" />
                  기술 스택
                </h2>
                <div className="flex flex-wrap gap-2">
                  {["L4", "C++", "Linux", "TCP/IP", "Python", "L3", "C", "Go", "L2"].map((tech) => (
                    <Badge key={tech} variant="outline" className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <img
                          alt={tech}
                          height="20"
                          width="20"
                          src={`https://cdn.jumpit.co.kr/images/stacks/${tech}.png`}
                          className="rounded-sm"
                        />
                        {tech}
                      </div>
                    </Badge>
                  ))}
                </div>
              </section>

              {/* 주요 업무 */}
              <section>
                <h2 className="text-2xl font-semibold mb-4 dark:text-white">주요 업무</h2>
                <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Linux os에서 구동되는 자사 제품의 응용 소프트웨어 개발</li>
                  <li>Linux 시스템 프로그래밍</li>
                  <li>IP Network Layer 3~7 프로그래밍 (TCP, UDP 소켓)</li>
                </ul>
              </section>

              {/* 자격 요건 */}
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 dark:text-white">
                  <GraduationCap className="w-6 h-6" />
                  자격 요건
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">기본 요건</h3>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• 학력 : 대졸 이상(석,박사 우대)</li>
                        <li>• 전공 : 컴퓨터/정보통신 공학 계열 또는 이학 계열</li>
                        <li>• 경력 : 3년 이상</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">기술 요건</h3>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• C/C++/Go/Python 중 1개 주력 언어 3년 이상</li>
                        <li>• Linux OS 지식</li>
                        <li>• 네트워크 프로그래밍 지식</li>
                        <li>• 병렬/비동기 프로그래밍 지식</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 우대사항 */}
              <section>
                <h2 className="text-2xl font-semibold mb-4 dark:text-white">우대사항</h2>
                <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Linux Kernel 개발 경험자</li>
                  <li>네트워크 관련 지식 (L2/L3/L4/L7 프로토콜) 보유자</li>
                  <li>DPDK / eBPF / XDP 등 고속 패킷 처리 지식 보유자</li>
                  <li>VPN (Wireguard/IPsec/SSL) 지식 보유자</li>
                </ul>
              </section>

              {/* 복지 및 혜택 */}
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 dark:text-white">
                  <Heart className="w-6 h-6" />
                  복지 및 혜택
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">Culture</h3>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                      <li>• 탄력근무제, 재택근무</li>
                      <li>• 워라벨 중시 (9to6 지향)</li>
                      <li>• 자율복장</li>
                      <li>• 여름휴가(3일) 및 휴가비</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">Benefit</h3>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                      <li>• 장기근속자 포상</li>
                      <li>• 교육비/자격증 지원</li>
                      <li>• 성과급</li>
                      <li>• 통신비/야근식사</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">Health & Family</h3>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                      <li>• 종합건강검진</li>
                      <li>• 경조사비 지원</li>
                      <li>• 명절 선물</li>
                      <li>• 생일축하금</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 채용절차 */}
              <section>
                <h2 className="text-2xl font-semibold mb-4 dark:text-white">채용절차</h2>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium dark:text-white">서류전형</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">1차</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium dark:text-white">코딩 테스트 및 실무 면접</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">2차</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium dark:text-white">임원 면접</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">3차</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium dark:text-white">처우 협의</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">4차</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">※ 절차는 변경될 수 있습니다.</p>
              </section>
            </div>

            {/* 지원하기 버튼 */}
            <div className="mt-8 flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg"
                  onClick={handleApply}
                  disabled={isApplying}
                >
                  {isApplying ? "지원 중..." : "지원하기"}
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }
  return <div>Recruitment Details for ID: {id}</div>;
};

export default RecruitDetailPage;
