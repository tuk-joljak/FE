import useRadioStore from "@/stores/filter";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Filter } from "./Filter";
import Tag from "./Tag";

const firstOptions = [
  { value: "대기업", label: "대기업" },
  { value: "중견기업", label: "중견기업" },
  { value: "중소기업", label: "중소기업" },
];

const secondOptions = [
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid" },
  { value: "senior", label: "Senior" },
];

const thirdOptions = [
  { value: "seoul", label: "Seoul" },
  { value: "busan", label: "Busan" },
  { value: "incheon", label: "Incheon" },
];

const fourthOptions = [
  { value: "3000", label: "3000만원 이상" },
  { value: "5000", label: "5000만원 이상" },
  { value: "7000", label: "7000만원 이상" },
];

const groupNames = ["회사 유형", "필요 경력", "지역", "연봉"];
const optionsList = [firstOptions, secondOptions, thirdOptions, fourthOptions];

const FilterBar = () => {
  const { inputValue, clearInputValue } = useRadioStore();

  return (
    <div className="center">
      <div className="mt-4 w-[1160px] h-[252px] border-[1px] border-solid rounded-lg">
        <div className="flex w-full justify-evenly h-[200px]">
          {groupNames.map((groupName, index) => (
            <>
              <Filter
                options={optionsList[index]}
                groupName={groupName}
                key={groupName}
              />
              {index < groupNames.length - 1 && (
                <Separator orientation="vertical" />
              )}
            </>
          ))}
          <Separator orientation="vertical" />
          <Input className="w-[25%] mx-4 mt-3" placeholder="검색" />
        </div>
        <Separator />
        <div className="flex items-center h-[52px] gap-2 px-2">
          {groupNames.map((groupName) => (
            <Tag key={groupName} groupName={groupName} />
          ))}
          {inputValue && <Tag groupName="Search" />}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
