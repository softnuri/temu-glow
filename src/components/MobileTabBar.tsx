import { useNavigate } from "react-router-dom";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home, ShoppingCart, Heart, User } from "lucide-react";

const MobileTabBar = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                display: { xs: "block", md: "none" },
                borderTop: 1,
                borderColor: "divider",
                bgcolor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(8px)",
                zIndex: 1000,
            }}
        >
            <BottomNavigation
                showLabels
                onChange={(_, newValue) => {
                    navigate(newValue);
                }}
                sx={{
                    height: 64,
                    "& .MuiBottomNavigationAction-root": {
                        color: "text.secondary",
                        "&.Mui-selected": {
                            color: "primary.main",
                        },
                    },
                }}
            >
                <BottomNavigationAction
                    label="홈"
                    value="/"
                    icon={<Home className="h-5 w-5" />}
                />
                <BottomNavigationAction
                    label="장바구니"
                    value="/cart"
                    icon={<ShoppingCart className="h-5 w-5" />}
                />
                <BottomNavigationAction
                    label="위시리스트"
                    value="/wishlist"
                    icon={<Heart className="h-5 w-5" />}
                />
                <BottomNavigationAction
                    label="프로필"
                    value="/profile"
                    icon={<User className="h-5 w-5" />}
                />
            </BottomNavigation>
        </Box>
    );
};

export default MobileTabBar;
