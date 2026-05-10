import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import thunkProducts from "../store/products/thunk/thunkProducts";
import { productsCleanUp } from "../store/products/productsSlice";
import { useParams } from "react-router-dom";

export const useProducts = () => {
    const { prefix } = useParams();
    const dispatch = useAppDispatch();
    const { loading, records, error } = useAppSelector((state) => state.products);
    const cartItems = useAppSelector((state) => state.cart.items);
    const wishlistItemsId = useAppSelector((state) => state.wishlist.itemsId);
    const userAccessToken = useAppSelector((state) => state.auth.accessToken);

    const productsFullInfo = records.map((product) => {
        return { ...product, quantity: cartItems[product.id] ?? 0, isWishlisted: wishlistItemsId.includes(product.id),
            isAuthenticated: userAccessToken ? true : false};
    });

    useEffect(() => {
        if (!prefix) {
            return;
        }
        const promise = dispatch(thunkProducts(prefix));
        // clean products
        return () => {
            dispatch(productsCleanUp());
            promise.abort();
        }
    }, [dispatch, prefix]);

    const isInvalidPrefix = prefix && !/^[a-z]+$/i.test(prefix);

    return { loading, productsFullInfo, error, prefix, isInvalidPrefix };
}