import { Heading } from "../components/common";
import { CartItemList, CartSubtotalPrice } from "../components/eCommerce";
import { Loading, LottieHandler } from "../components/feedback";
import useCart from "../hooks/useCart";

function Cart() {
    const { products, loading, error, changeQuantityHandler, removeItemHandler, userAccessToken, placeOrderStatus } = useCart();

    return (
        <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', padding: '2rem' }}>
            <Heading title="Cart" />
            <Loading status={loading} error={error} type="cart">
                {products.length > 0 ? (
                    <>
                        <CartItemList products={products} changeQuantityHandler={changeQuantityHandler} removeItemHandler={removeItemHandler} />
                        <CartSubtotalPrice products={products} userAccessToken={userAccessToken} />
                    </>
                ) : placeOrderStatus === "pending" ? (
                    <LottieHandler type="filling_cart" message="Loading, please wait..." />
                ) : placeOrderStatus === "succeeded" ? (
                    <LottieHandler type="success" message="Order placed successfully!" />
                ) : (
                    <LottieHandler type="cart_empty" message="Your cart is empty" />
                )}
            </Loading>
        </div>
    )
}

export default Cart;