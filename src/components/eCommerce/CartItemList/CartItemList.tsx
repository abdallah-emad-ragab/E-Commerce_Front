import type { TProduct } from "../../../types/products";
import CartItem from "../CartItem/CartItem";

type CartItemListProps = {
    products: TProduct[];
    changeQuantityHandler?: (id: number, quantity: number) => void;
    removeItemHandler?: (id: number) => void;
};

function CartItemList({ products, changeQuantityHandler, removeItemHandler }: CartItemListProps) {
    const renderCartItems = products.map((el) => <CartItem key={el.id} {...el} changeQuantityHandler={changeQuantityHandler} removeItemHandler={removeItemHandler} />);
    return (
        <div>{renderCartItems}</div>
    )
}

export default CartItemList;