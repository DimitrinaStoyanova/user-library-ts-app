import { FieldError } from "react-hook-form";

interface ErrorMessageProps {
  error: FieldError;
}

const ErrorMessage = (props: ErrorMessageProps) => {
  const { error } = props;

  return <div className="text-danger small text-start">{error.message}</div>;
};

export default ErrorMessage;
