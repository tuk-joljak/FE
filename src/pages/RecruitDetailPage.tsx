import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const RecruitDetailPage = () => {
  const { id } = useParams();

  if (id === "1") {
    return (
      <div className="flex items-center justify-center pb-4 mt-4">
        <div className="w-[1200px] border border-solid rounded border-primary p-4">
          <div className="sc-923c3317-0 jIWuEG">
            <h1 className="text-4xl font-bold">리눅스서버 SW 개발자 채용</h1>

            <a
              target="_blank"
              href="/company/MjIwODE2MzE4OQ==?company_nm=스콥정보통신"
              className="flex items-center"
            >
              <span>스콥정보통신</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="none"
                viewBox="0 0 12 12"
              >
                <path
                  fill="#222"
                  fill-rule="evenodd"
                  d="M4.146 1.896a.5.5 0 0 1 .708 0l3.75 3.75a.5.5 0 0 1 0 .708l-3.75 3.75a.5.5 0 0 1-.708-.708L7.543 6 4.146 2.604a.5.5 0 0 1 0-.708Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
            <ul className="flex gap-4 my-4 ">
              <Badge>
                <li className="text-base">🚆3호선 역세권 기업</li>
              </Badge>
              <Badge>
                <li className="text-base">
                  <a href="/positions?tag=FREE_DRESS">#자유복장</a>
                </li>
              </Badge>
              <Badge>
                <li className="text-base">
                  <a href="/positions?tag=FREE_BOOK">#도서구입비지원</a>
                </li>
              </Badge>
            </ul>
          </div>
          <div className="flex flex-col gap-4 position_info">
            <h2 className="text-3xl font-semibold">포지션 상세 정보</h2>
            <dl className="sc-e76d2562-0 jqzywl">
              <dt className="text-2xl font-semibold">기술스택</dt>
              <dd>
                <pre className="flex gap-4">
                  <Badge variant="outline">
                    <div className="flex items-center justify-center gap-1">
                      <img
                        alt="L4"
                        height="20"
                        width="20"
                        src="https://cdn.jumpit.co.kr/images/stacks/noStack.png"
                      />
                      L4
                    </div>
                  </Badge>
                  <Badge variant="outline">
                    <div className="flex items-center justify-center gap-1">
                      <img
                        alt="C++"
                        height="20"
                        width="20"
                        src="https://cdn.jumpit.co.kr/images/stacks/CPlusPlus.png"
                      />
                      C++
                    </div>
                  </Badge>
                  <Badge variant="outline">
                    <div className="flex items-center justify-center gap-1">
                      <img
                        alt="Linux"
                        height="20"
                        width="20"
                        src="https://cdn.jumpit.co.kr/images/stacks/linux.png"
                      />
                      Linux
                    </div>
                  </Badge>
                  <Badge variant="outline">
                    <div className="flex items-center justify-center gap-1">
                      <img
                        alt="TCP/IP"
                        height="20"
                        width="20"
                        src="https://cdn.jumpit.co.kr/images/stacks/noStack.png"
                      />
                      TCP/IP
                    </div>
                  </Badge>
                  <Badge variant="outline">
                    <div className="flex items-center justify-center gap-1">
                      <img
                        alt="Python"
                        height="20"
                        width="20"
                        src="https://cdn.jumpit.co.kr/images/stacks/python.png"
                      />
                      Python
                    </div>
                  </Badge>
                  <Badge variant="outline">
                    <div className="flex items-center justify-center gap-1">
                      <img
                        alt="L3"
                        height="20"
                        width="20"
                        src="https://cdn.jumpit.co.kr/images/stacks/noStack.png"
                      />
                      L3
                    </div>
                  </Badge>
                  <Badge variant="outline">
                    <div className="flex items-center justify-center gap-1">
                      <img
                        alt="C"
                        height="20"
                        width="20"
                        src="https://cdn.jumpit.co.kr/images/stacks/noStack.png"
                      />
                      C
                    </div>
                  </Badge>
                  <Badge variant="outline">
                    <div className="flex items-center justify-center gap-1">
                      <img
                        alt="Go"
                        height="20"
                        width="20"
                        src="https://cdn.jumpit.co.kr/images/stacks/go.png"
                      />
                      Go
                    </div>
                  </Badge>
                  <Badge variant="outline">
                    <div className="flex items-center justify-center gap-1">
                      <img
                        alt="L2"
                        height="20"
                        width="20"
                        src="https://cdn.jumpit.co.kr/images/stacks/noStack.png"
                      />
                      L2
                    </div>
                  </Badge>
                </pre>
              </dd>
            </dl>
            <dl className="sc-e76d2562-0 jqzywl">
              <dt className="text-2xl font-semibold">주요업무</dt>

              <dd className="space-y-2">
                <div>
                  • Linux os에서 구동되는 자사 제품의 응용 소프트웨어 개발
                </div>
                <div>• Linux 시스템 프로그래밍</div>
                <div>• IP Network Layer 3~7 프로그래밍 (TCP, UDP 소켓)</div>
              </dd>
            </dl>
            <dl className="sc-e76d2562-0 jqzywl">
              <dt className="text-2xl font-semibold">자격요건</dt>
              <dd className="space-y-2">
                <div>• 학력 : 대졸 이상(석,박사 우대)</div>
                <div>
                  • 전공 : 컴퓨터 / 정보통신 공학 계열 또는 이학 계열 (수학,
                  물리학)
                </div>
                <div>• 경력 : 3년 이상</div>
                <div>
                  1. C/C++/Go/Python 중에서 1개의 주력 언어로 개발한 경력 3년
                  이상자
                </div>
                <div>2. Linux OS 지식 보유자</div>
                <div>
                  3. 네트워크 프로그래밍 (TCP/UDP 등 소켓 프로그래밍) 지식
                  보유자
                </div>
                <div>
                  4. 병렬/비동기 프로그래밍(Multi-thread / Multi-process /
                  Multi-core) 지식 보유자
                </div>
              </dd>
            </dl>
            <dl className="sc-e76d2562-0 jqzywl">
              <dt className="text-2xl font-semibold">우대사항</dt>
              <dd className="space-y-2">
                <div>• Linux Kernel 개발 경험자</div>
                <div>• 네트워크 관련 지식 (L2/L3/L4/L7 프로토콜) 보유자</div>
                <div>• DPDK / eBPF / XDP 등 고속 패킷 처리 지식 보유자</div>
                <div>• VPN (Wireguard/IPsec/SSL) 지식 보유자</div>
              </dd>
            </dl>
            <dl className="sc-e76d2562-0 jqzywl">
              <dt className="text-2xl font-semibold">복지 및 혜택</dt>
              <dd className="space-y-2">
                <div className="text-xl">[Culture]</div>
                <div>• 탄력근무제, 재택근무 시행</div>
                <div>• 워라벨을 중요시 합니다. 야근 문화 없음 (9to6 지향)</div>
                <div>• 자율복장</div>
                <div>• 여름휴가(3일) 지원 및 여름휴가비 지원</div>
                <div>• 자유로운 휴가사용</div>
                <div>• 징검다리연휴 휴무</div>
                <div>• 사내카페테리아 운영 (커피머신, 안마의자 등)</div>
                <div className="text-xl">[Benefit]</div>
                <div>
                  • 장기근속자(3년,5년,7년,10년 ~) 상품권 포상 및 Refresh 휴가
                  지급
                </div>
                <div>• 포상제도 (우수사원 포상, 직무발명 포상 등)</div>
                <div>• 교육비, 자격증 취득 비용, 도서구입비 지원</div>
                <div>• 성과급 (성과에 따른 연 1회 지급)</div>
                <div>• 통신비 지원</div>
                <div>• 동호회 지원</div>
                <div>• 야근식사 지원</div>
                <div className="text-xl">[Health]</div>
                <div>• 종합건강검진비 지원</div>
                <div className="text-xl">[Family]</div>
                <div>• 경조사비지원 및 경조휴가 지원</div>
                <div>• 결혼기념일, 미혼자를 위한 생일축하금 지원</div>
                <div>• 명절 선물 지원</div>
                <div>※ 회사 성장에 따른 추가 복리후생 제도 도입 예정</div>
              </dd>
            </dl>
            <dl className="sc-e76d2562-0 jqzywl">
              <dt className="text-2xl font-semibold">
                채용절차 및 기타 지원 유의사항
              </dt>
              <dd className="space-y-2">
                <div>
                  • 서류전형 → 코딩 테스트 및 실무 면접 → 임원 면접 → 처우 협의
                  → 최종합격
                </div>
                <div>※ 절차는 변경될 수 있습니다.</div>
                <div>• 직전연봉, 희망연봉 필수 기재 요망</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    );
  }
  return <div>Recruitment Details for ID: {id}</div>;
};

export default RecruitDetailPage;
