import { useForm, type SubmitHandler } from "react-hook-form";
import { LoginSchema, type LoginType } from "../Validations/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { resetUI, thunkLogin } from "../store/auth/authSlice";
import { useEffect } from "react";

function useLogin() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const dispach = useAppDispatch();
    const { error, loading, accessToken } = useAppSelector((state) => state.auth);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginType>({
        resolver: zodResolver(LoginSchema),
        mode: "onBlur", // Validate on blur (when the user leaves the input field)
    });

    const submitHandler: SubmitHandler<LoginType> = (data) => {
        if (searchParams.get("message")) {
            setSearchParams("")
        }
        dispach(thunkLogin(data)).unwrap().then(() => navigate("/"));
    }

    useEffect(() => {
        return () => {
            dispach(resetUI());
        }
    }, [dispach]);

    return { error, loading, accessToken, register, handleSubmit, errors, searchParams, submitHandler };
}

export default useLogin;