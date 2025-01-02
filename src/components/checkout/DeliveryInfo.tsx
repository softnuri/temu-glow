import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Paper, Typography, Box } from "@mui/material";

interface DeliveryInfoProps {
  orderInfo: {
    address: string;
    addressDetail: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DeliveryInfo = ({ orderInfo, handleInputChange }: DeliveryInfoProps) => {
  return (
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
  );
};

export default DeliveryInfo;