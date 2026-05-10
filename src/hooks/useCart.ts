import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { cartChangeQantity, cartRemoveItem, thunkCart } from "../store/cart/cartSlice";
import { resetOrderState } from "../store/order/orderSlice";

const useCart = () => {
    const dispatch = useAppDispatch();
    const { items, productsFullInfo, loading, error } = useAppSelector(state => state.cart);
    const userAccessToken = useAppSelector(state => state.auth.accessToken);
    const placeOrderStatus = useAppSelector(state => state.order.loading);

    const products = productsFullInfo.map((el) => ({
        ...el,
        quantity: items[el.id] || 0
    }));

    // useCallback to prevent unnecessary re-renders of CartItem components when quantity changes
    const changeQuantityHandler = useCallback((id: number, quantity: number) => {
        dispatch(cartChangeQantity({ id, quantity }));
    }, [dispatch]);

    const removeItemHandler = useCallback((id: number) => {
        dispatch(cartRemoveItem(id));
    }, [dispatch]);

    useEffect(() => {
        dispatch(thunkCart());
        return () => {
            dispatch(resetOrderState());
        }
    }, [dispatch]);

    return { products, loading, error, changeQuantityHandler, removeItemHandler, userAccessToken, placeOrderStatus };
}

export default useCart