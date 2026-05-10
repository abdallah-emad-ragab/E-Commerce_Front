import Lottie from "lottie-react";
import not_found from "../../../assets/lottieFiles/not_found.json";
import error from "../../../assets/lottieFiles/error.json";
import cart_empty from "../../../assets/lottieFiles/cart_empty.json";
import filling_cart from "../../../assets/lottieFiles/filling_cart.json";
import success from "../../../assets/lottieFiles/success.json";
import { Link } from "react-router-dom";

const lottieFilesMap = {
    not_found,
    error,
    cart_empty,
    filling_cart,
    success,
};

type LottieProps = {
    type: keyof typeof lottieFilesMap;
    message?: string;
}

function LottieHandler({ type, message }: LottieProps) {
    const lottie = lottieFilesMap[type];
    const messageStyle = type === "error" ? { color: "red", textAlign: "center" as const } : { textAlign: "center" as const };
    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <Lottie animationData={lottie} loop={true} style={{ width: "600px", height: "400px" }} />
            <h3 style={messageStyle}>{message}</h3>
            <p>How about going to <Link replace={true} to="/">home page</Link>?</p>
        </div>
    )
}

export default LottieHandler;