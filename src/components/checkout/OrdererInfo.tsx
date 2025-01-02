import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Paper, Typography, Box } from "@mui/material";

interface OrdererInfoProps {
  orderInfo: {
    name: string;
    phone: string;
    email: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const OrdererInfo = ({ orderInfo, handleInputChange }: OrdererInfoProps) => {
  return (
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
  );
};

export default OrdererInfo;