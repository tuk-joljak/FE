interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="p-4 mt-4 border border-red-200 rounded-lg bg-red-50">
      <p className="text-red-600">{message}</p>
    </div>
  );
};

export default ErrorMessage; 