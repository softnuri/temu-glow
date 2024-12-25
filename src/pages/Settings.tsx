import {
  Container,
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Switch,
  Divider,
} from '@mui/material';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { toast } from 'sonner';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      marketing: false,
    },
    privacy: {
      shareData: false,
      locationServices: true,
    },
    preferences: {
      darkMode: false,
      autoPlay: true,
    }
  });

  const handleToggle = (category: keyof typeof settings, setting: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
    toast.success("설정이 변경되었습니다.");
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          설정
        </Typography>

        <Paper elevation={1}>
          <List>
            <ListItem>
              <Typography variant="h6" color="primary">알림 설정</Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="이메일 알림"
                secondary="주문 상태 및 프로모션 관련 이메일을 받습니다"
              />
              <Switch
                edge="end"
                checked={settings.notifications.email}
                onChange={() => handleToggle('notifications', 'email')}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="푸시 알림"
                secondary="앱 푸시 알림을 받습니다"
              />
              <Switch
                edge="end"
                checked={settings.notifications.push}
                onChange={() => handleToggle('notifications', 'push')}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="마케팅 알림"
                secondary="특별 할인 및 이벤트 알림을 받습니다"
              />
              <Switch
                edge="end"
                checked={settings.notifications.marketing}
                onChange={() => handleToggle('notifications', 'marketing')}
              />
            </ListItem>

            <ListItem sx={{ mt: 2 }}>
              <Typography variant="h6" color="primary">개인정보 설정</Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="데이터 공유"
                secondary="서비스 개선을 위한 사용 데이터를 공유합니다"
              />
              <Switch
                edge="end"
                checked={settings.privacy.shareData}
                onChange={() => handleToggle('privacy', 'shareData')}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="위치 서비스"
                secondary="위치 기반 서비스를 사용합니다"
              />
              <Switch
                edge="end"
                checked={settings.privacy.locationServices}
                onChange={() => handleToggle('privacy', 'locationServices')}
              />
            </ListItem>

            <ListItem sx={{ mt: 2 }}>
              <Typography variant="h6" color="primary">앱 설정</Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="다크 모드"
                secondary="어두운 테마를 사용합니다"
              />
              <Switch
                edge="end"
                checked={settings.preferences.darkMode}
                onChange={() => handleToggle('preferences', 'darkMode')}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="자동 재생"
                secondary="비디오 자동 재생을 활성화합니다"
              />
              <Switch
                edge="end"
                checked={settings.preferences.autoPlay}
                onChange={() => handleToggle('preferences', 'autoPlay')}
              />
            </ListItem>
          </List>
        </Paper>
      </Container>
    </Box>
  );
};

export default Settings;