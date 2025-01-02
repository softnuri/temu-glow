import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Paper, Typography, Box } from "@mui/material";

interface PaymentInfoProps {
  orderInfo: {
    cardNumber?: string;
    cardExpiry?: string;
    cardCVC?: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentInfo = ({ orderInfo, handleInputChange }: PaymentInfoProps) => {
  return (
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
  );
};

export default PaymentInfo;