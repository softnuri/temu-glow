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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

interface Address {
  id: number;
  name: string;
  address: string;
  detail: string;
  phone: string;
  isDefault: boolean;
}

const AddressManagement = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      name: "홍길동",
      address: "서울특별시 강남구 테헤란로 123",
      detail: "456호",
      phone: "010-1234-5678",
      isDefault: true,
    }
  ]);

  const [open, setOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);

  const handleAddEdit = (address?: Address) => {
    if (address) {
      setCurrentAddress(address);
    } else {
      setCurrentAddress({
        id: addresses.length + 1,
        name: "",
        address: "",
        detail: "",
        phone: "",
        isDefault: false,
      });
    }
    setOpen(true);
  };

  const handleSave = () => {
    if (currentAddress) {
      if (addresses.find(a => a.id === currentAddress.id)) {
        setAddresses(addresses.map(a => a.id === currentAddress.id ? currentAddress : a));
        toast.success("배송지가 수정되었습니다.");
      } else {
        setAddresses([...addresses, currentAddress]);
        toast.success("배송지가 추가되었습니다.");
      }
    }
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    setAddresses(addresses.filter(a => a.id !== id));
    toast.success("배송지가 삭제되었습니다.");
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            배송지 관리
          </Typography>
          <Button
            variant="contained"
            startIcon={<FontAwesomeIcon icon={faPlus} />}
            onClick={() => handleAddEdit()}
          >
            새 배송지 추가
          </Button>
        </Box>

        <Paper elevation={1}>
          <List>
            {addresses.map((address) => (
              <ListItem
                key={address.id}
                secondaryAction={
                  <Box>
                    <IconButton onClick={() => handleAddEdit(address)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(address.id)} color="error">
                      <FontAwesomeIcon icon={faTrash} />
                    </IconButton>
                  </Box>
                }
                sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {address.name}
                      {address.isDefault && (
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
                          기본 배송지
                        </Typography>
                      )}
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="body2">{address.address} {address.detail}</Typography>
                      <Typography variant="body2" color="text.secondary">{address.phone}</Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{currentAddress?.id ? '배송지 수정' : '새 배송지 추가'}</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
              <div>
                <Typography variant="subtitle2" gutterBottom>받는 사람</Typography>
                <Input
                  value={currentAddress?.name || ''}
                  onChange={(e) => setCurrentAddress(curr => curr ? { ...curr, name: e.target.value } : null)}
                />
              </div>
              <div>
                <Typography variant="subtitle2" gutterBottom>주소</Typography>
                <Input
                  value={currentAddress?.address || ''}
                  onChange={(e) => setCurrentAddress(curr => curr ? { ...curr, address: e.target.value } : null)}
                />
              </div>
              <div>
                <Typography variant="subtitle2" gutterBottom>상세주소</Typography>
                <Input
                  value={currentAddress?.detail || ''}
                  onChange={(e) => setCurrentAddress(curr => curr ? { ...curr, detail: e.target.value } : null)}
                />
              </div>
              <div>
                <Typography variant="subtitle2" gutterBottom>연락처</Typography>
                <Input
                  value={currentAddress?.phone || ''}
                  onChange={(e) => setCurrentAddress(curr => curr ? { ...curr, phone: e.target.value } : null)}
                />
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>취소</Button>
            <Button onClick={handleSave} variant="contained">저장</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AddressManagement;