interface SubmitButtonProps {
  isLoading: boolean;
  isDisabled: boolean;
}

const SubmitButton = ({ isLoading, isDisabled }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`w-full py-3 px-6 rounded-lg font-semibold text-white 
        ${
          isDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } transition-colors`}
    >
      {isLoading ? "분석 중..." : "분석하기"}
    </button>
  );
};

export default SubmitButton; 