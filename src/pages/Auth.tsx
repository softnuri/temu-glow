import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Container, Paper, Typography, Box } from "@mui/material";

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            환영합니다
          </Typography>
          <Typography color="text.secondary">
            계정에 로그인하거나 새로운 계정을 만들어주세요
          </Typography>
        </Box>
        
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#2563eb',
                  brandAccent: '#1d4ed8',
                }
              }
            }
          }}
          providers={["google"]}
          localization={{
            variables: {
              sign_in: {
                email_label: "이메일",
                password_label: "비밀번호",
                button_label: "로그인",
                loading_button_label: "로그인 중...",
                social_provider_text: "{{provider}}로 계속하기",
                link_text: "이미 계정이 있으신가요? 로그인",
              },
              sign_up: {
                email_label: "이메일",
                password_label: "비밀번호",
                button_label: "회원가입",
                loading_button_label: "회원가입 중...",
                social_provider_text: "{{provider}}로 계속하기",
                link_text: "계정이 없으신가요? 회원가입",
              },
            },
          }}
          redirectTo={`${window.location.origin}/auth/callback`}
          showLinks={true}
          view="sign_in"
        />
      </Paper>
    </Container>
  );
};

export default AuthPage;