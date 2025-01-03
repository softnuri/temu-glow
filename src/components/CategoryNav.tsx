import { Link } from "react-router-dom";
import { Container, Box, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
    faLaptop,
    faTshirt,
    faCouch,
    faStar,
    faDumbbell,
    faGamepad,
} from "@fortawesome/free-solid-svg-icons";
import "swiper/css";
import "swiper/css/navigation";

const categories = [
    { id: "electronics", name: "전자기기", icon: faLaptop, color: "#9b87f5" },
    { id: "fashion", name: "패션", icon: faTshirt, color: "#D6BCFA" },
    { id: "home", name: "홈/리빙", icon: faCouch, color: "#F2FCE2" },
    { id: "beauty", name: "뷰티", icon: faStar, color: "#FEF7CD" },
    { id: "sports", name: "스포츠", icon: faDumbbell, color: "#FEC6A1" },
    { id: "toys", name: "완구", icon: faGamepad, color: "#F1F0FB" },
];

const CategoryNav = () => {
    return (
        <Box
            sx={{
                borderBottom: "1px solid",
                borderColor: "divider",
                backgroundColor: "white",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                position: "sticky",
                width: "100%",
                top: {
                    xs: "calc(56px + 72px)", // Mobile height (56px) + search bar height (72px)
                    md: "64px", // Desktop navbar height
                },
                zIndex: 9,
                transition: "top 0.3s ease-in-out",
            }}
        >
            <Container maxWidth="xl">
                <Box
                    sx={{
                        py: { xs: 2, md: 3 },
                        px: 2,
                    }}
                >
                    <Swiper
                        modules={[Navigation]}
                        navigation={true}
                        slidesPerView="auto"
                        spaceBetween={24}
                        className="category-swiper"
                    >
                        {categories.map((category) => (
                            <SwiperSlide key={category.id}>
                                <Link
                                    to={`/category/${category.id}`}
                                    className="group flex flex-col items-center min-w-[80px] text-decoration-none transition-all duration-300 hover:-translate-y-1"
                                    style={{
                                        color: "inherit",
                                        textDecoration: "none",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: { xs: 48, md: 60 },
                                            height: { xs: 48, md: 60 },
                                            borderRadius: "16px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: category.color,
                                            marginBottom: 1,
                                            transform: "scale(1)",
                                            transition:
                                                "transform 0.2s ease-in-out",
                                            "&:hover": {
                                                transform: "scale(1.05)",
                                            },
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={category.icon}
                                            size="lg"
                                            style={{ color: "#1A1F2C" }}
                                        />
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 500,
                                            textAlign: "center",
                                            color: "#1A1F2C",
                                            fontSize: {
                                                xs: "0.875rem",
                                                md: "1rem",
                                            },
                                        }}
                                    >
                                        {category.name}
                                    </Typography>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
            </Container>
        </Box>
    );
};

export default CategoryNav;
