import useRadioStore from "@/stores/filter";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Filter } from "./Filter";
import Tag from "./Tag";

const radioOptions = [
  { value: "default", label: "Default" },
  { value: "comfortable", label: "Comfortable" },
  { value: "compact", label: "Compact" },
];

const groupNames = ["회사 유형", "필요 경력", "지역", "연봉"];

const FilterBar = () => {
  const { inputValue, clearInputValue } = useRadioStore();
  
  return (
    <div className="center">
      <div className="mt-4 w-[1160px] h-[252px] border-[1px] border-solid rounded-lg">
        <div className="flex w-full justify-evenly h-[200px]">
          {groupNames.map((groupName, index) => (
            <>
              <Filter options={radioOptions} groupName={groupName} />
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
