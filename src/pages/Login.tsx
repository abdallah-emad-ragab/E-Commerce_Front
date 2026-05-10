import { Navigate } from "react-router-dom";
import { Heading } from "../components/common";
import useLogin from "../hooks/useLogin";

export default function Login() {
    const { error, loading, accessToken, register, handleSubmit, errors, searchParams, submitHandler } = useLogin();

    if (accessToken) {
        return <Navigate to="/" />;
    }

    return (
            <>
                <Heading title="Login" />
                {/* Messages */}
                {searchParams.get("message") === "account-created" && <div className="alert alert-success">Account created successfully. Please login.</div>}
                {searchParams.get("message") === "login_required" && <div className="alert alert-info">You need to login to access this page.</div>}

                {/* Form */}
                <form className="col-12 col-md-8 col-lg-6 mx-auto my-4" onSubmit={handleSubmit(submitHandler)}>
                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="Register-email-input" className="form-label">Email address</label>
                        <input type="text" className={`form-control ${errors.email?.message ? "is-invalid" : ""}`} id="Register-email-input" {...register("email")} />
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label htmlFor="Register-password-input" className="form-label">Password</label>
                        <input type="password" className={`form-control ${errors.password?.message ? "is-invalid" : ""}`} id="Register-password-input" {...register("password")} />
                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </div>
                    <button type="submit" className="btn btn-info text-white">
                        {loading === "pending" ? <> <div className="spinner-border spinner-border-sm" role="status"></div> loading </> : "Login"}
                    </button>
                    {error && (<div className="form-text text-danger mt-2">{error}</div>)}
                </form>
        </>
    )
}