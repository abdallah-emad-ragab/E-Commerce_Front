import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
const MainLayout = lazy(() => import("./layouts/MainLayout/MainLayout"));
const ProfileLayout = lazy(() => import("./layouts/ProfileLayout/ProfileLayout"));
const Home = lazy(() => import("./pages/Home"));
const Categories = lazy(() => import("./pages/Categories"));
const Products = lazy(() => import("./pages/Products"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Account = lazy(() => import("./pages/Account"));
const Orders = lazy(() => import("./pages/Orders"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
import Error from "./pages/Error";
import ProtectedRoute from "./components/Auth/ProtectedRoute"; // To protect routes that require authentication
import { SuspenseFallback } from "./components/feedback";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                {/* index : to make it default page */}
                <Route index element={<SuspenseFallback> <Home /> </SuspenseFallback>} />
                <Route path="/categories" element={<SuspenseFallback> <Categories /> </SuspenseFallback>} />
                <Route path="/categories/products/:prefix" element={<SuspenseFallback> <Products /> </SuspenseFallback>} />
                <Route path="/cart" element={<SuspenseFallback> <Cart /> </SuspenseFallback>} />
                <Route path="/wishlist" element={
                    <ProtectedRoute>
                        <SuspenseFallback>
                            <Wishlist />
                        </SuspenseFallback>
                    </ProtectedRoute>} />
                <Route path="/about-us" element={<SuspenseFallback> <AboutUs /> </SuspenseFallback>} />
                <Route path="login" element={<SuspenseFallback> <Login /> </SuspenseFallback>} />
                <Route path="register" element={<SuspenseFallback> <Register /> </SuspenseFallback>} />
                {/* Profile Layout */}
                <Route path="account" element={
                    <ProtectedRoute>
                        <SuspenseFallback>
                            <ProfileLayout />
                        </SuspenseFallback>
                    </ProtectedRoute>
                }>
                    <Route index element={<Account />} />
                    <Route path="orders" element={<Orders />} />
                </Route>
                <Route path="*" element={<Error />} />
            </Route>
        </Routes>
    )
}
export default App;