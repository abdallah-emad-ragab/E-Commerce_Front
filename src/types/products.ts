export type TProduct = {
    id: number;
    title: string;
    price: number;
    cat_prefix: string;
    max: number;
    img: string;
    quantity?: number;
    isWishlisted?: boolean;
    isAuthenticated?: boolean;
}