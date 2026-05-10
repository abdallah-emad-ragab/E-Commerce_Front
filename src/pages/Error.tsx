// import { Link } from "react-router-dom";

import { LottieHandler } from "../components/feedback";

// interface ErrorProps {
//     status?: number;
//     message?: string;
// }

export default function Error() {
    return (
        // <div className="container mt-5 text-center">
        //     <h1 className="mb-3">Error {props.status || 404}</h1>
        //     <p> {props.message || "Page Not Found"}
        //         <br />
        //         How about going back to the <Link replace={true} to="/">home page</Link>
        //     </p>
        // </div>
        <div className="d-flex flex-column align-items-center justify-content-center">
            <div>
                <LottieHandler type="not_found" message="Page Not Found" />
            </div>
        </div>
    )
}