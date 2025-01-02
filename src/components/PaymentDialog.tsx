import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
  success: boolean;
}

export const PaymentDialog = ({ open, onClose, success }: PaymentDialogProps) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (success) {
      navigate('/profile/orders');
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {success ? "결제 완료" : "결제 실패"}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-center text-muted-foreground">
            {success 
              ? "결제가 성공적으로 완료되었습니다."
              : "결제 처리 중 오류가 발생했습니다. 다시 시도해 주세요."
            }
          </p>
        </div>
        <div className="flex justify-center">
          <Button onClick={handleConfirm}>
            {success ? "주문내역 보기" : "확인"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};