import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterType } from "../Validations/RegisterSchema";
import type React from "react";
import useCheckEmailAvailability from "../hooks/useCheckEmailAvailability";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import thunkRegister from "../store/auth/thunk/thunkRegister";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { resetUI } from "../store/auth/authSlice";

function useRegister() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, error, accessToken } = useAppSelector((state) => state.auth);

    const { register, handleSubmit, formState: { errors }, trigger, getFieldState } = useForm<RegisterType>({
        // This will use the Zod schema to validate the form inputs and provide error messages based on the schema's rules
        resolver: zodResolver(registerSchema),
        mode: "onBlur", // Validate on blur (when the user leaves the input field)
    });

    const { emailAbailabilityStatus, enteredEmail, checkEmailAvailability, resetEmailAvailabilityStatus } = useCheckEmailAvailability();

    const submitHandler: SubmitHandler<RegisterType> = (data) => {
        const { firstName, lastName, email, password } = data;
        dispatch(thunkRegister({ firstName, lastName, email, password })).unwrap()
            .then(() => navigate("/login?message=account-created")); // After a successful registration, the user is navigated to the login page.
    }

    const emailOnBlurHandler = async (event: React.FocusEvent<HTMLInputElement>) => {
        await trigger("email"); // To manually trigger validation for the email field when it loses focus
        const { isDirty, invalid } = getFieldState("email"); // To get the current state of the email field, including whether it has been modified (isDirty) and whether it is currently invalid (invalid)
        const value = event.target.value;
        if (isDirty && !invalid && value !== enteredEmail) {
            // Checking if email is available or not in database
            checkEmailAvailability(value);
        }
        // If the email field has been modified (isDirty), is currently invalid (invalid), and has a value (enteredEmail), then reset the email availability status.
        // This is likely to ensure that if the user changes the email after it has been checked for availability, the status is reset to reflect that the new email has not yet been checked.
        if (isDirty && invalid && enteredEmail) {
            resetEmailAvailabilityStatus();
        }
    }

    useEffect(() => {
        return () => {
            dispatch(resetUI());
        }
    }, [dispatch]);

    return {  register, handleSubmit, errors, emailAbailabilityStatus, loading, error, accessToken, emailOnBlurHandler, submitHandler };
}

export default useRegister;