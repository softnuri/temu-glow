import { useNavigate } from "react-router-dom";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home, ShoppingCart, Heart } from "lucide-react";

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
                bgcolor: "background.paper",
                zIndex: 1000,
            }}
        >
            <BottomNavigation
                showLabels
                onChange={(_, newValue) => {
                    navigate(newValue);
                }}
            >
                <BottomNavigationAction label="홈" value="/" icon={<Home />} />
                <BottomNavigationAction
                    label="장바구니"
                    value="/cart"
                    icon={<ShoppingCart />}
                />
                <BottomNavigationAction
                    label="위시리스트"
                    value="/wishlist"
                    icon={<Heart />}
                />
            </BottomNavigation>
        </Box>
    );
};

export default MobileTabBar;
