import { Suspense } from "react";
import LottieHandler from "../LottieHandler/LottieHandler";

function SuspenseFallback({children}: {children: React.ReactNode}) {
    return (
        <Suspense fallback={<LottieHandler type="filling_cart" message="Loading, please wait..." />}>{children}</Suspense>
    )
}

export default SuspenseFallback;