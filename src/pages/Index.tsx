import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import CategoryNav from "../components/CategoryNav";
import ProductCard from "../components/ProductCard";
import MainBanner from "../components/MainBanner";
import BestProducts from "../components/BestProducts";
import NewProducts from "../components/NewProducts";
import MobileTabBar from "../components/MobileTabBar";
import { allProducts } from "../data/products";

const Index = () => {
    const { id: categoryId } = useParams();
    const [searchQuery, setSearchQuery] = useState("");

    const allProductsList = Object.values(allProducts).flat();

    const filteredProducts = categoryId
        ? allProducts[categoryId as keyof typeof allProducts]?.filter(
              (product) =>
                  product.title
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
          ) || []
        : allProductsList.filter((product) =>
              product.title.toLowerCase().includes(searchQuery.toLowerCase())
          );

    return (
        <div className="min-h-screen bg-gray-50 scrollbar-hide">
            <Navbar onSearch={setSearchQuery} />
            <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
                {!categoryId && <MainBanner />}
                <CategoryNav />
                {!categoryId && (
                    <>
                        <BestProducts />
                        <NewProducts />
                    </>
                )}
                <div className={`bg-white rounded-lg p-4 mb-6 shadow-sm`}>
                    <h1 className="text-xl font-bold text-gray-800">
                        {categoryId
                            ? getCategoryTitle(categoryId)
                            : "추천 상품"}
                    </h1>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </main>
            <MobileTabBar />
        </div>
    );
};

const getCategoryTitle = (categoryId: string) => {
    const titles: { [key: string]: string } = {
        electronics: "전자기기",
        fashion: "패션",
        home: "홈/리빙",
        beauty: "뷰티",
        sports: "스포츠",
        toys: "완구",
    };
    return titles[categoryId] || "추천 상품";
};

export default Index;
