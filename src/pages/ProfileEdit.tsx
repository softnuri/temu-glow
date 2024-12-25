import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Avatar,
} from '@mui/material';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    name: '사용자 이름',
    email: 'user@example.com',
    phone: '010-1234-5678',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 프로젝트에서는 여기서 API를 호출하여 프로필을 업데이트
    toast.success("프로필이 업데이트되었습니다.");
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          프로필 수정
        </Typography>

        <Paper elevation={1} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Avatar sx={{ width: 100, height: 100, mb: 2 }}>
              <FontAwesomeIcon icon={faUser} size="2x" />
            </Avatar>
            <Button variant="outlined" size="small">
              프로필 사진 변경
            </Button>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  이름
                </Typography>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <Typography variant="subtitle2" gutterBottom>
                  이메일
                </Typography>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <Typography variant="subtitle2" gutterBottom>
                  전화번호
                </Typography>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2 }}
              >
                저장하기
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProfileEdit;