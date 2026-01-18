import { toast } from "sonner";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { useNavigate } from "react-router-dom";

const BuyCourseButton = ({
  courseId,
  purchaseCourse,
  onPurchaseSuccess,
}: {
  courseId: string;
  purchaseCourse: boolean;
  onPurchaseSuccess?: () => void;
}) => {
  const navigate = useNavigate();

  const [
    createCheckoutSession,
    { data, isLoading, isError, error, isSuccess },
  ] = useCreateCheckoutSessionMutation();

  const handleClick = async () => {
    if (purchaseCourse) {
      navigate(`/course-progress/${courseId}`);
      return;
    }
    await createCheckoutSession({ courseId });
  };

  useEffect(() => {
    if (isSuccess && data?.url) {
      window.location.href = data.url;
      // optional: after returning from Stripe, call refetch
      onPurchaseSuccess?.();
    }

    if (isError) {
      toast.error(isError);
    }
  }, [isSuccess, data, isError, error, onPurchaseSuccess]);

  return (
    <Button onClick={handleClick} disabled={isLoading}>
      {isLoading
        ? "Loading..."
        : purchaseCourse
          ? "Go to Course"
          : "Purchase Course"}
    </Button>
  );
};

export default BuyCourseButton;
