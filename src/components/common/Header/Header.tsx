import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import HeaderLeftSide from './HeaderLeftSide/HeaderLeftSide';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { authLogout } from '../../../store/auth/authSlice';
import { thunkLikeToggle } from '../../../store/wishlist/wishlistSlice';

export default function Header() {
    const dispatch = useAppDispatch();
    const { user, accessToken } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (accessToken) {
            dispatch(thunkLikeToggle("ProductsIds"));
        }
    }, [dispatch, accessToken]);

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
                <div className="container">
                    <Link className="navbar-brand fw-bold fs-3 text-accent" to="/">
                        ShopZone
                    </Link>
                    <button
                        className="navbar-toggler border-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/categories">Categories</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about-us">About Us</Link>
                            </li>
                        </ul>

                        <div className="d-flex align-items-center gap-3">
                            <HeaderLeftSide />

                            {!accessToken ? (
                                <div className="d-flex gap-2">
                                    <Link className="btn btn-accent fw-semibold px-4" to="/login">
                                        Login
                                    </Link>
                                    <Link className="btn btn-outline-light fw-semibold px-4" to="/register">
                                        Register
                                    </Link>
                                </div>
                            ) : (
                                <div className="dropdown">
                                    <button
                                        className="btn btn-light text-dark dropdown-toggle d-flex align-items-center gap-2 fw-semibold"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                        </svg>
                                        {user?.firstName}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><Link to="/account" className="dropdown-item">Account</Link></li>
                                        <li><Link to="/account/orders" className="dropdown-item">Orders</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <Link to="/" className="dropdown-item" onClick={async () => {
                                                dispatch(authLogout());
                                                // Also clear cart and wishlist state on logout
                                                try { const cartMod = await import('../../../store/cart/cartSlice'); dispatch(cartMod.cartCleanUp()); } catch (e) { /* ignore */ }
                                                try { const wishMod = await import('../../../store/wishlist/wishlistSlice'); dispatch(wishMod.productsWishlistCleanUp()); } catch (e) { /* ignore */ }
                                            }}>
                                                Logout
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}