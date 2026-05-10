import { memo } from "react";
import styles from "./styles.module.css";
import type { TProduct } from "../../../types/products";

type CartItemProps = TProduct & {
    changeQuantityHandler?: (id: number, quantity: number) => void;
    removeItemHandler?: (id: number) => void;
};

function CartItem({ id, title, price, quantity, max, img, changeQuantityHandler, removeItemHandler }: CartItemProps) {

    const renderOptions = Array(max).fill(0).map((_, index) => (
        <option key={index + 1} value={index + 1}>{index + 1}</option>
    ));
    const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const quantity = +event.target.value; // + to convert string to number
        changeQuantityHandler?.(id, quantity);
    };

    console.log("render");

    return (
        <div className={styles.cartItem}>
            <div className={styles.product}>
                <div className={styles.productImg}>
                    <img src={img} alt={title} />
                </div>
                <div className={styles.productInfo}>
                    <h2>{title}</h2>
                    <h3>{price.toFixed(2)} EGP</h3>
                    <button className="btn btn-danger btn-sm mt-auto"
                        style={{ color: "white", width: "100px" }}
                        onClick={() => removeItemHandler?.(id)}
                    >
                        Remove
                    </button>
                </div>
            </div>

            <div className={styles.cartItemSelection}>
                <span className="d-block mb-1">Quantity</span>
                <select className="form-select" value={quantity} onChange={changeQuantity}>
                    {renderOptions}
                </select>
            </div>
        </div>
    )
}

export default memo(CartItem);