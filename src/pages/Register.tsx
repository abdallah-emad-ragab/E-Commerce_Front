import { Heading } from "../components/common";
import { Navigate } from "react-router-dom";
import useRegister from "../hooks/useRegister";

export default function Register() {
    const { error, loading, accessToken, register, handleSubmit, errors, emailAbailabilityStatus, emailOnBlurHandler, submitHandler } = useRegister();

    if (accessToken) {
        return <Navigate to="/" />;
    }

    return (
            <>
                <Heading title="Register" />
                <form className="col-12 col-md-8 col-lg-6 mx-auto my-4" onSubmit={handleSubmit(submitHandler)}>
                    {/* First name */}
                    <div className="mb-3">
                        <label htmlFor="Register-first-name-input" className="form-label">First Name</label>
                        <input type="text" className={`form-control ${errors.firstName?.message ? "is-invalid" : ""}`} id="Register-first-name-input" {...register("firstName")} />
                        {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
                    </div>

                    {/* Last name */}
                    <div className="mb-3">
                        <label htmlFor="Register-last-name-input" className="form-label">Last Name</label>
                        <input type="text" className={`form-control ${errors.lastName?.message ? "is-invalid" : ""}`} id="Register-last-name-input" {...register("lastName")} />
                        {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="Register-email-input" className="form-label">Email address</label>
                        <input type="text" className={`form-control ${errors.email?.message ? "is-invalid" : ""}`} 
                        id="Register-email-input" {...register("email")} onBlur={emailOnBlurHandler}
                        disabled={emailAbailabilityStatus === "checking" || loading === "pending"} />
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                        {/* Display email availability status */}
                        {emailAbailabilityStatus === "checking" && <div className="form-text text-info">Checking email availability...</div>}
                        {emailAbailabilityStatus === "available" && <div className="form-text text-success">Email is available!</div>}
                        {emailAbailabilityStatus === "unavailable" && <div className="form-text text-danger">Email is already taken.</div>}
                        {emailAbailabilityStatus === "failed" && <div className="form-text text-danger">Error from the server.</div>}
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label htmlFor="Register-password-input" className="form-label">Password</label>
                        <input type="password" className={`form-control ${errors.password?.message ? "is-invalid" : ""}`} id="Register-password-input" {...register("password")} />
                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-3">
                        <label htmlFor="Register-confirm-password-input" className="form-label">Confirm Password</label>
                        <input type="password" className={`form-control ${errors.confirmPassword?.message ? "is-invalid" : ""}`} id="Register-confirm-password-input" {...register("confirmPassword")} />
                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
                    </div>

                    <button type="submit" className="btn btn-info text-white" disabled={emailAbailabilityStatus === "checking"}>
                        {loading === "pending" ? <> <div className="spinner-border spinner-border-sm" role="status"></div> loading </> : "Register"}
                    </button>
                    {loading === "failed" || error && <div className="form-text text-danger mt-2">{error}</div>}
                </form>
        </>
    )
}