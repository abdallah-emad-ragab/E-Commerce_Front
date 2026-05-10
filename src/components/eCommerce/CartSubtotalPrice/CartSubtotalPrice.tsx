import { useState } from "react";
import type { TProduct } from "../../../types/products";
import styles from "./styles.module.css";
import { useAppDispatch } from "../../../store/hooks";
import { thunkPlaceOrder } from "../../../store/order/orderSlice";
import { cartCleanUp } from "../../../store/cart/cartSlice";

type CartSubtotalPriceProps = { products: TProduct[], userAccessToken?: string | null };

function CartSubtotalPrice({ products, userAccessToken }: CartSubtotalPriceProps) {
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const subtotal = products.reduce((acc, el) => acc + (el.price * (el.quantity || 0)), 0);

    const handleShowModal = () => {
        setShowModal(prev => !prev);
        setError(null);
    };
    const handlePlaceOrder = () => {
        setLoading(true);
        dispatch(thunkPlaceOrder(subtotal)).unwrap()
            .then(() => {
                dispatch(cartCleanUp());
                setShowModal(false);
            })
            .catch((error) => {
                setError(error || "Failed to place order. Please try again later.");
            })
            .finally(() => setLoading(false));
    };

    return (
        <>
            {/* Modal */}
            <div className="modal show fade" tabIndex={showModal ? 0 : -1} style={{ display: showModal ? "block" : "none" }} role="dialog" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Placing Order</h5>
                            <button type="button" className="btn-close" onClick={handleShowModal} data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to place order with {" "} {subtotal.toFixed(2)} EGP?</p>
                            {!loading && error && <p className="text-danger mt-2">{error}</p>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleShowModal}>Close</button>
                            <button type="button" className="btn btn-info text-white" onClick={handlePlaceOrder}>{loading ? <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> loading...</> : "Confirm"}</button>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && <div className="modal-backdrop show"></div>}

        {/* Cart Subtotal */}
        <div className={styles.container}>
            {!subtotal ? "Your cart is empty" :
                <>
                    <span>Subtotal:</span>
                    <span>{subtotal.toFixed(2)} EGP</span>
                </>}
        </div>
        <div className={styles.container}>
            {userAccessToken && (
                <>
                    <span></span>
                    <span> <button className="btn btn-info text-white" onClick={handleShowModal}>Place Order</button> </span>
                </>
            )}
        </div>
        </>
    );
};

export default CartSubtotalPrice;