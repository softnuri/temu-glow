import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    Avatar,
} from "@mui/material";
import {
    Home,
    ShoppingCart,
    Heart,
    MapPin,
    CreditCard,
    Settings,
    LogOut,
    LogIn,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface SidebarMenuProps {
    onClose: () => void;
}

const SidebarMenu = ({ onClose }: SidebarMenuProps) => {
    const { session } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            toast.success("로그아웃되었습니다");
            navigate("/");
            onClose();
        } catch (error) {
            toast.error("로그아웃 중 오류가 발생했습니다");
        }
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        onClose();
    };

    const menuItems = [
        { icon: Home, text: "홈", onClick: () => handleNavigation("/") },
        {
            icon: ShoppingCart,
            text: "장바구니",
            onClick: () => handleNavigation("/cart"),
            auth: true,
        },
        {
            icon: Heart,
            text: "위시리스트",
            onClick: () => handleNavigation("/wishlist"),
            auth: true,
        },
        {
            icon: MapPin,
            text: "배송지 관리",
            onClick: () => handleNavigation("/profile/address"),
            auth: true,
        },
        {
            icon: CreditCard,
            text: "결제 수단",
            onClick: () => handleNavigation("/profile/payment"),
            auth: true,
        },
        {
            icon: Settings,
            text: "설정",
            onClick: () => handleNavigation("/profile/settings"),
            auth: true,
        },
    ];

    return (
        <Box sx={{ p: 2 }}>
            {session ? (
                <Box sx={{ mb: 2, textAlign: "center" }}>
                    <Avatar sx={{ width: 64, height: 64, mx: "auto", mb: 1 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        {session.user.email}
                    </Typography>
                </Box>
            ) : (
                <Box sx={{ mb: 2, textAlign: "center" }}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        로그인하고 더 많은 기능을 사용해보세요
                    </Typography>
                </Box>
            )}

            <Divider sx={{ mb: 2 }} />

            <List>
                {menuItems.map((item, index) =>
                    item.auth && !session ? null : (
                        <ListItem
                            key={index}
                            onClick={item.onClick}
                            sx={{
                                cursor: "pointer",
                                "&:hover": { bgcolor: "action.hover" },
                            }}
                        >
                            <ListItemIcon>
                                <item.icon size={20} />
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    )
                )}
                <ListItem
                    onClick={
                        session ? handleLogout : () => handleNavigation("/auth")
                    }
                    sx={{
                        cursor: "pointer",
                        "&:hover": { bgcolor: "action.hover" },
                    }}
                >
                    <ListItemIcon>
                        {session ? <LogOut size={20} /> : <LogIn size={20} />}
                    </ListItemIcon>
                    <ListItemText primary={session ? "로그아웃" : "로그인"} />
                </ListItem>
            </List>
        </Box>
    );
};

export default SidebarMenu;
