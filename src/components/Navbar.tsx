import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    Box,
    Drawer,
    Container,
    alpha,
    styled,
} from "@mui/material";
import { Menu, SearchIcon } from "lucide-react";
import SidebarMenu from "./SidebarMenu";

const SearchWrapper = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius * 3,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.black, 0.08),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
    },
}));

interface NavbarProps {
    onSearch?: (query: string) => void;
}

const Navbar = ({ onSearch }: NavbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchValue(value);
        onSearch?.(value);
    };

    return (
        <AppBar
            position="sticky"
            color="default"
            elevation={1}
            sx={{
                borderBottom: "1px solid",
                borderColor: "divider",
                backgroundColor: "white",
            }}
        >
            <Container maxWidth="xl">
                <Toolbar
                    sx={{
                        justifyContent: "space-between",
                        px: { xs: 1, sm: 2 },
                        minHeight: { xs: "56px", md: "64px" },
                    }}
                >
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{
                            textDecoration: "none",
                            color: "primary.main",
                            fontWeight: "bold",
                            flexShrink: 0,
                        }}
                    >
                        Temu
                    </Typography>

                    <SearchWrapper
                        sx={{
                            display: { xs: "none", md: "flex" },
                            flex: 1,
                            maxWidth: "xl",
                            mx: 8,
                        }}
                    >
                        <SearchIconWrapper>
                            <SearchIcon className="h-5 w-5" />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="What are you looking for?"
                            inputProps={{ "aria-label": "search" }}
                            value={searchValue}
                            onChange={handleSearchChange}
                        />
                    </SearchWrapper>

                    <IconButton
                        onClick={() => setIsMenuOpen(true)}
                        sx={{ ml: 1 }}
                    >
                        <Menu className="h-6 w-6" />
                    </IconButton>
                </Toolbar>

                {/* Mobile search bar */}
                <Box
                    sx={{
                        display: { xs: "block", md: "none" },
                        p: 2,
                        borderTop: 1,
                        borderColor: "divider",
                    }}
                >
                    <SearchWrapper>
                        <SearchIconWrapper>
                            <SearchIcon className="h-5 w-5" />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="What are you looking for?"
                            inputProps={{ "aria-label": "search" }}
                            value={searchValue}
                            onChange={handleSearchChange}
                        />
                    </SearchWrapper>
                </Box>
            </Container>

            <Drawer
                anchor="right"
                open={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
            >
                <Box sx={{ width: 280, height: "100%" }}>
                    <SidebarMenu onClose={() => setIsMenuOpen(false)} />
                </Box>
            </Drawer>
        </AppBar>
    );
};

export default Navbar;
