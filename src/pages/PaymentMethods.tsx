import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCreditCard, faPlus } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import { toast } from 'sonner';

interface PaymentMethod {
  id: number;
  type: string;
  last4: string;
  expiryDate: string;
  isDefault: boolean;
}

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 1,
      type: "Visa",
      last4: "4242",
      expiryDate: "12/24",
      isDefault: true,
    }
  ]);

  const handleAddPayment = () => {
    // 실제 프로젝트에서는 여기서 결제 프로바이더의 결제 수단 추가 플로우를 시작
    toast.info("결제 수단 추가 기능은 준비 중입니다.");
  };

  const handleDelete = (id: number) => {
    setPaymentMethods(methods => methods.filter(m => m.id !== id));
    toast.success("결제 수단이 삭제되었습니다.");
  };

  const handleSetDefault = (id: number) => {
    setPaymentMethods(methods =>
      methods.map(m => ({
        ...m,
        isDefault: m.id === id
      }))
    );
    toast.success("기본 결제 수단이 변경되었습니다.");
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            결제 수단 관리
          </Typography>
          <Button
            variant="contained"
            startIcon={<FontAwesomeIcon icon={faPlus} />}
            onClick={handleAddPayment}
          >
            새 결제 수단 추가
          </Button>
        </Box>

        <Paper elevation={1}>
          <List>
            {paymentMethods.map((method) => (
              <ListItem
                key={method.id}
                secondaryAction={
                  <Box>
                    {!method.isDefault && (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleSetDefault(method.id)}
                        sx={{ mr: 1 }}
                      >
                        기본으로 설정
                      </Button>
                    )}
                    <IconButton onClick={() => handleDelete(method.id)} color="error">
                      <FontAwesomeIcon icon={faTrash} />
                    </IconButton>
                  </Box>
                }
                sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <FontAwesomeIcon icon={faCreditCard} />
                      <span>{method.type} •••• {method.last4}</span>
                      {method.isDefault && (
                        <Typography
                          variant="caption"
                          sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                          }}
                        >
                          기본 결제 수단
                        </Typography>
                      )}
                    </Box>
                  }
                  secondary={`만료일: ${method.expiryDate}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
};

export default PaymentMethods;