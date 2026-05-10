import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { Heading } from "../components/common";

function Account() {
    const { accessToken } = useAppSelector((state) => state.auth);
    const accountInfo = useAppSelector((state) => state.auth.user);

    if (!accessToken) {
        return <Navigate to="/login" />;
    }
    return (
        <>
            <Heading title="Account Information" />
            <ul>
                <li>Name: {accountInfo?.firstName} {accountInfo?.lastName}</li>
                <li>Email: {accountInfo?.email}</li>
            </ul>
        </>
    )
}

export default Account;