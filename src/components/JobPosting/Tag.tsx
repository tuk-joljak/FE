import useRadioStore from "@/stores/filter"; // Zustand 스토어를 가져옵니다.

interface TagProps {
  groupName: string; // 이 태그가 어떤 그룹의 선택된 값을 보여줄지 식별
}

const Tag = ({ groupName }: TagProps) => {
  const { selections, clearSelection } = useRadioStore();
  const selectedValue = selections[groupName];

  // 선택된 값이 없으면 null을 반환하여 렌더링하지 않음
  if (!selectedValue) {
    return null;
  }

  return (
    <div className="cursor-pointer tag" onClick={() => clearSelection(groupName)}>
      <div className="flex items-center px-2 py-1 text-white rounded-full bg-primary">
        <span>{selectedValue}</span>
        <button
          // 해당 그룹의 선택된 값을 초기화
          className="ml-2"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Tag;
