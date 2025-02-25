import { MainCarousel } from "@/components/main/MainCarousel";
import MainRecruitList from "@/components/main/MainRecruitList";
import SelectList from "@/components/main/SelectList";

function MainPage() {
  return (
    <div className="flex-col gap-20 center">
      <MainCarousel />
      <div className="gap-4 center w-[1160px]">
        <MainRecruitList />
        <SelectList />
      </div>
    </div>
  );
}

export default MainPage;
