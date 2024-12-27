import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MessageDialog } from "@/components/MessageDialog";

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
  const navigate = useNavigate();
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    name: "",
    phone: "",
    email: "",
    address: "",
    addressDetail: "",
    paymentMethod: "card",
  });
  const [showConfirm, setShowConfirm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    const requiredFields = ["name", "phone", "email", "address"];
    const missingFields = requiredFields.filter((field) => !orderInfo[field as keyof OrderInfo]);

    if (missingFields.length > 0) {
      toast.error("필수 정보를 모두 입력해주세요.");
      return;
    }

    setShowConfirm(true);
  };

  const handleConfirmOrder = () => {
    // Here you would typically process the payment and create the order
    toast.success("주문이 완료되었습니다!");
    navigate("/profile/orders");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          주문하기
        </Typography>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            주문자 정보
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div>
              <Label htmlFor="name">이름 *</Label>
              <Input
                id="name"
                name="name"
                value={orderInfo.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="phone">연락처 *</Label>
              <Input
                id="phone"
                name="phone"
                value={orderInfo.phone}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="email">이메일 *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={orderInfo.email}
                onChange={handleInputChange}
              />
            </div>
          </Box>
        </Paper>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            배송 정보
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div>
              <Label htmlFor="address">주소 *</Label>
              <Input
                id="address"
                name="address"
                value={orderInfo.address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="addressDetail">상세주소</Label>
              <Input
                id="addressDetail"
                name="addressDetail"
                value={orderInfo.addressDetail}
                onChange={handleInputChange}
              />
            </div>
          </Box>
        </Paper>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            결제 정보
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div>
              <Label htmlFor="cardNumber">카드번호</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                value={orderInfo.cardNumber}
                onChange={handleInputChange}
                placeholder="0000-0000-0000-0000"
              />
            </div>
            <Box sx={{ display: "flex", gap: 2 }}>
              <div style={{ flex: 1 }}>
                <Label htmlFor="cardExpiry">유효기간</Label>
                <Input
                  id="cardExpiry"
                  name="cardExpiry"
                  value={orderInfo.cardExpiry}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                />
              </div>
              <div style={{ flex: 1 }}>
                <Label htmlFor="cardCVC">CVC</Label>
                <Input
                  id="cardCVC"
                  name="cardCVC"
                  value={orderInfo.cardCVC}
                  onChange={handleInputChange}
                  placeholder="000"
                />
              </div>
            </Box>
          </Box>
        </Paper>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button size="lg" onClick={handleSubmit}>
            주문하기
          </Button>
        </Box>

        <MessageDialog
          open={showConfirm}
          onClose={() => setShowConfirm(false)}
          title="주문 확인"
          showTitleImage={true}
          message="주문을 진행하시겠습니까?"
          buttons={[
            {
              label: "취소",
              variant: "outline",
              onClick: () => setShowConfirm(false),
            },
            {
              label: "확인",
              onClick: handleConfirmOrder,
            },
          ]}
        />
      </Container>
    </Box>
  );
};

export default Checkout;