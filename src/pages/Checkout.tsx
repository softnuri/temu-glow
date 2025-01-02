import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Box } from "@mui/material";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import { PaymentDialog } from "@/components/PaymentDialog";
import OrdererInfo from "@/components/checkout/OrdererInfo";
import DeliveryInfo from "@/components/checkout/DeliveryInfo";
import PaymentInfo from "@/components/checkout/PaymentInfo";

interface OrderInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  addressDetail: string;
  paymentMethod: "card" | "bank";
  cardNumber?: string;
  cardExpiry?: string;
  cardCVC?: string;
  bankAccount?: string;
  bankHolder?: string;
}

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    name: "",
    phone: "",
    email: "",
    address: "",
    addressDetail: "",
    paymentMethod: "card",
  });
  
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!location.state?.cartItems) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = () => {
    const requiredFields = ["name", "phone", "email", "address"];
    const missingFields = requiredFields.filter((field) => !orderInfo[field as keyof OrderInfo]);

    if (missingFields.length > 0) {
      toast.error("필수 정보를 모두 입력해주세요.");
      return;
    }

    const success = Math.random() > 0.2;
    setPaymentSuccess(success);
    setShowPaymentDialog(true);

    if (success) {
      localStorage.setItem('cartItems', '[]');
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <OrdererInfo orderInfo={orderInfo} handleInputChange={handleInputChange} />
        <DeliveryInfo orderInfo={orderInfo} handleInputChange={handleInputChange} />
        <PaymentInfo orderInfo={orderInfo} handleInputChange={handleInputChange} />

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button size="lg" onClick={handlePayment}>
            결제하기
          </Button>
        </Box>

        <PaymentDialog
          open={showPaymentDialog}
          onClose={() => setShowPaymentDialog(false)}
          success={paymentSuccess}
        />
      </Container>
    </Box>
  );
};

export default Checkout;