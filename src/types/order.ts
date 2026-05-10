import type { TProduct } from "./products";

export type TOrderItem = {
    id: number;
    userId: number;
    items: TProduct[];
    subtotal: number;
}