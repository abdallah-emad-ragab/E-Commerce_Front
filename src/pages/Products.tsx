import { Product } from "../components/eCommerce";
import { Loading } from "../components/feedback";
import GridList from "../components/common/GridList/GridList";
import type { TProduct } from "../types/products";
import { Heading } from "../components/common";
import { useProducts } from "../hooks/useProducts";

export default function Products() {
    const { loading, productsFullInfo, error, prefix } = useProducts();
    return (
        <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
            <div className="container py-5">
                <div className="text-center mb-5">
                    <Heading title={<><span className="text-capitalize">{prefix}</span> Products</>} />
                    <p className="lead text-muted mt-3">
                        Discover our curated collection of {prefix} products, carefully selected for quality and value.
                    </p>
                </div>
                <Loading status={loading} error={error || ""} type="product">
                    <GridList<TProduct>
                        records={productsFullInfo}
                        emptyMessage="No products found in this category"
                        renderItem={(record) => <Product {...record} />}
                    />
                </Loading>
            </div>
        </div>
    );
}