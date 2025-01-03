import { useParams, useNavigate } from "react-router-dom";
import {
    Button,
    Container,
    Typography,
    Rating,
    IconButton,
    Paper,
    Grid,
    Box,
    List,
    ListItem,
    ListItemText,
    Divider,
    Chip,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faHeart,
    faShare,
    faStar,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import ReviewSection from "../components/ReviewSection";
import { toast } from "sonner";
import { allProducts } from "../data/products";
import { Product } from "../types/product";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const product = Object.values(allProducts)
        .flat()
        .find((p) => p.id === Number(id)) as Product | undefined;

    if (!product) {
        return (
            <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
                <Navbar />
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Typography variant="h4">Product not found</Typography>
                    <Button
                        startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                        onClick={() => navigate(-1)}
                        sx={{ mt: 2 }}
                        color="inherit"
                    >
                        Go Back
                    </Button>
                </Container>
            </Box>
        );
    }

    const discount = Math.round(
        (1 - product.price / (product.originalPrice || product.price)) * 100
    );

    const handleAddToCart = () => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        const existingItem = cartItems.find(
            (item: any) => item.id === product.id
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: 1,
                image: product.image,
            });
        }

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        toast.success("장바구니에 추가되었습니다!");
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("링크가 복사되었습니다!");
    };

    // ... keep existing code (JSX rendering part)

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
            <Navbar />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Button
                    startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                    onClick={() => navigate(-1)}
                    sx={{ mb: 3 }}
                    color="inherit"
                >
                    뒤로가기
                </Button>

                <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    aspectRatio: "1/1",
                                    borderRadius: 2,
                                    overflow: "hidden",
                                }}
                            >
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    component="h1"
                                    gutterBottom
                                >
                                    {product.title}
                                </Typography>

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <Rating
                                        value={product.rating}
                                        readOnly
                                        precision={0.1}
                                    />
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        ({product.rating})
                                    </Typography>
                                    {product.sales && (
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {product.sales}+ sold
                                        </Typography>
                                    )}
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "baseline",
                                        gap: 2,
                                    }}
                                >
                                    <Typography variant="h4" component="span">
                                        ${product.price}
                                    </Typography>
                                    {product.originalPrice && (
                                        <Typography
                                            variant="h6"
                                            component="span"
                                            color="text.secondary"
                                            sx={{
                                                textDecoration: "line-through",
                                            }}
                                        >
                                            ${product.originalPrice}
                                        </Typography>
                                    )}
                                    {discount > 0 && (
                                        <Typography
                                            variant="h6"
                                            component="span"
                                            color="error.main"
                                        >
                                            -{discount}%
                                        </Typography>
                                    )}
                                </Box>

                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{ mt: 2 }}
                                >
                                    {product.description}
                                </Typography>

                                <Box sx={{ mt: 3 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Specifications
                                    </Typography>
                                    <List>
                                        {Object.entries(
                                            product.specifications
                                        ).map(([key, value]) => (
                                            <ListItem key={key} sx={{ py: 1 }}>
                                                <ListItemText
                                                    primary={
                                                        key
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        key.slice(1)
                                                    }
                                                    secondary={value}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>

                                <Box sx={{ mt: 3 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Key Features
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 1,
                                        }}
                                    >
                                        {product.features.map(
                                            (feature, index) => (
                                                <Chip
                                                    key={index}
                                                    icon={
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                        />
                                                    }
                                                    label={feature}
                                                    variant="outlined"
                                                    sx={{ borderRadius: 1 }}
                                                />
                                            )
                                        )}
                                    </Box>
                                </Box>

                                <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={handleAddToCart}
                                        fullWidth
                                    >
                                        Add to Cart
                                    </Button>
                                    <IconButton
                                        onClick={() =>
                                            toast.success(
                                                "위시리스트에 추가되었습니다!"
                                            )
                                        }
                                    >
                                        <FontAwesomeIcon icon={faHeart} />
                                    </IconButton>
                                    <IconButton onClick={handleShare}>
                                        <FontAwesomeIcon icon={faShare} />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper elevation={1} sx={{ p: 3, mt: 4, borderRadius: 2 }}>
                    <ReviewSection
                        productId={Number(id)}
                        productTitle={product.title}
                        productImage={product.image}
                    />
                </Paper>
            </Container>
        </Box>
    );
};

export default ProductDetail;
