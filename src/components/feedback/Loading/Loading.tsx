import type React from "react";
import type { TLoading } from "../../../types/shared";
import CategorySkeleton from "../skeletons/CategorySkeleton/CategorySkeleton";
import CartSkeleton from "../skeletons/CartSkeleton/CartSkeleton";
import ProductSkeleton from "../skeletons/ProductSkeleton/ProductSkeleton";
import LottieHandler from "../LottieHandler/LottieHandler";

const skeletonsTypes = {
    category: CategorySkeleton,
    cart: CartSkeleton,
    product: ProductSkeleton,
}

type LoadingProps = {
    status: TLoading;
    error: string | null;
    children: React.ReactNode; // Like React.JSX.Element but more commonly
    type?: keyof typeof skeletonsTypes; // "category" | "cart" | "product"
}

export default function Loading({error, status, children, type = "category"}: LoadingProps) {
    const SkeletonComponent = skeletonsTypes[type];
    if (status === "pending") {
        return <SkeletonComponent />;
    }
    if (status === "failed") {
        return <LottieHandler type="error" message={error as string} />;
    }
    return (
        <>
            {children}
        </>
    )
}