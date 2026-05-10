import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { thunkGetOrders } from "../store/order/orderSlice";
import { type TProduct } from "../types/products";

function useOrders() {
        const dispatch = useAppDispatch();
        const { loading, error, orderList } = useAppSelector(state => state.order);
    
        const [showModal, setShowModal] = useState(false);
        const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([]);
    
        const viewDetailsHandler = (id: number) => {
            const order = orderList.find(order => order.id === id);
            setShowModal(true);
            setSelectedProduct(order ? order.items : []);
        }
    
        const closeModalHandler = () => {
            setShowModal(false);
            setSelectedProduct([]);
        }
    
        useEffect(() => {
            const promise = dispatch(thunkGetOrders());
            return () => {
                promise.abort(); // Cleanup function to abort the fetch if the component unmounts
            };
        }, [dispatch]);

    return { loading, error, orderList, showModal, selectedProduct, viewDetailsHandler, closeModalHandler, setShowModal };
}

export default useOrders;