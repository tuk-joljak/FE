import { MainCarousel } from "@/components/main/MainCarousel";
import MainRecruitList from "@/components/main/MainRecruitList";
import { SelectList } from "@/components/main/SelectList";
import { motion } from "framer-motion";

function MainPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {/* 메인 캐러셀 */}
          <section>
            <MainCarousel />
          </section>

          {/* 채용 정보 섹션 */}
          <section className="flex flex-col lg:flex-row gap-8">
            {/* 채용 목록 */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-50">
                추천 채용
              </h2>
              <MainRecruitList />
            </div>

            {/* 카테고리 선택 */}
            <div className="lg:w-48">
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-50">
                카테고리
              </h2>
              <SelectList />
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

export default MainPage;
