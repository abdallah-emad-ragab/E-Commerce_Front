import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { productsWishlistCleanUp, thunkLikeToggle } from "../store/wishlist/wishlistSlice";

const useWishlist = () => {
    const dispatch = useAppDispatch();

    const { isLoading, productsFullInfo, error } = useAppSelector((state) => state.wishlist);
    const cartItems = useAppSelector((state) => state.cart.items);

    useEffect(() => {
        const promise = dispatch(thunkLikeToggle("ProductsFullInfo"));
        return () => {
            promise.abort();
            dispatch(productsWishlistCleanUp());
        };
    }, [dispatch]);

    const records = productsFullInfo.map((product) => {
        return { ...product, quantity: cartItems[product.id] ?? 0, isWishlisted: true, isAuthenticated: true };
    });

    return { isLoading, error, records };
}

export default useWishlist;