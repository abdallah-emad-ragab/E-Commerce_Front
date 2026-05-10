import { Heading } from "../components/common";
import { Loading } from "../components/feedback";
import GridList from "../components/common/GridList/GridList";
import type { TProduct } from "../types/products";
import { Product } from "../components/eCommerce";
import useWishlist from "../hooks/useWishlist";

function Wishlist() {
    const { isLoading, error, records } = useWishlist();

    return (
        <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', padding: '2rem' }}>
            <Heading title="Wishlist" />
            <Loading status={isLoading} error={error || ""} type="product">
                <GridList<TProduct> records={records} emptyMessage="Your wishlist is empty" renderItem={(record) => <Product {...record} />} />
            </Loading>
        </div>
    )
}

export default Wishlist;