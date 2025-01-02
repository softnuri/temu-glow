import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Container, Paper, Typography, Box } from "@mui/material";
import { toast } from "sonner";

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        toast.success("로그인되었습니다");
        navigate("/");
      } else if (event === "SIGNED_OUT") {
        toast.success("로그아웃되었습니다");
      } else if (event === "USER_UPDATED") {
        toast.success("프로필이 업데이트되었습니다");
      } else if (event === "USER_DELETED") {
        toast.success("계정이 삭제되었습니다");
      } else if (event === "PASSWORD_RECOVERY") {
        toast.success("비밀번호 재설정 이메일이 발송되었습니다");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
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
              forgotten_password: {
                email_label: "이메일",
                button_label: "비밀번호 재설정",
                loading_button_label: "재설정 링크 전송 중...",
                link_text: "비밀번호를 잊으셨나요?",
              },
            },
          }}
          redirectTo={`${window.location.origin}/auth/callback`}
          showLinks={true}
          view="sign_in"
          onError={(error) => {
            if (error.message.includes("Email not confirmed")) {
              toast.error("이메일 인증이 필요합니다. 이메일을 확인해주세요.");
            } else if (error.message.includes("Invalid login credentials")) {
              toast.error("이메일 또는 비밀번호가 올바르지 않습니다.");
            } else if (error.message.includes("weak_password")) {
              toast.error("비밀번호는 최소 6자 이상이어야 합니다.");
            } else {
              toast.error(error.message);
            }
          }}
        />
      </Paper>
    </Container>
  );
};

export default AuthPage;