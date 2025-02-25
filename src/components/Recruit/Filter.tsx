import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import useRadioStore from "@/stores/filter";

interface RadioOption {
  value: string;
  label: string;
}

interface FilterProps {
  groupName: string; // 각 라디오 그룹을 구분하는 고유 이름
  options: RadioOption[];
}

export function Filter({ groupName, options }: FilterProps) {
  const { selections, setSelection } = useRadioStore();
  const selectedValue = selections[groupName] || ""; // 이 그룹의 선택된 값을 가져옵니다.

  const handleChange = (value: string) => {
    setSelection(groupName, value); // 해당 그룹의 선택 값을 업데이트
  };

  return (
    <RadioGroup className="w-[25%] px-4" onValueChange={handleChange}>
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem
            value={option.value}
            id={`radio-${groupName}-${option.value}`}
            checked={selectedValue === option.value}
          />
          <Label htmlFor={`radio-${groupName}-${option.value}`}>
            {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
