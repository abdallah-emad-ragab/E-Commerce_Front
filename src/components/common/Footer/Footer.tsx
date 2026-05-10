import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';

export default function Footer() {
    const isAccessToken = useAppSelector(state => state.auth.accessToken);

    return (
        <footer className="bg-primary text-light mt-auto">
            <div className="container py-4">
                <div className="row g-4">
                    <div className="col-lg-4 col-md-6">
                        <h5 className="text-accent fw-bold mb-3">ShopZone</h5>
                        <p className="mb-0 text-light">
                            Your premier destination for quality products and exceptional shopping experiences.
                        </p>
                    </div>
                    <div className="col-lg-2 col-md-6">
                        <h6 className="fw-bold mb-3 text-light">Quick Links</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/categories" className="text-light text-decoration-none footer-link">Categories</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/cart" className="text-light text-decoration-none footer-link">Cart</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/wishlist" className="text-light text-decoration-none footer-link">Wishlist</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/about-us" className="text-light text-decoration-none footer-link">About Us</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-2 col-md-6">
                        <h6 className="fw-bold mb-3 text-light">Account</h6>
                        <ul className="list-unstyled">
                            {!isAccessToken ? (
                                <>
                                    <li className="mb-2">
                                        <Link to="/login" className="text-light text-decoration-none footer-link">Login</Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link to="/register" className="text-light text-decoration-none footer-link">Register</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="mb-2">
                                        <Link to="/account" className="text-light text-decoration-none footer-link">My Account</Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link to="/account/orders" className="text-light text-decoration-none footer-link">Orders</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <h6 className="fw-bold mb-3 text-light">Contact Info</h6>
                        <div className="d-flex flex-column gap-2">
                            <div className="d-flex align-items-center gap-2">
                                <svg width="16" height="16" fill="var(--accent-color)" viewBox="0 0 16 16">
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                    <path d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                </svg>
                                <span className="text-light small">123 Commerce St, Shop City</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <svg width="16" height="16" fill="var(--accent-color)" viewBox="0 0 16 16">
                                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                </svg>
                                <span className="text-light small">+1 (555) 123-4567</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <svg width="16" height="16" fill="var(--accent-color)" viewBox="0 0 16 16">
                                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                </svg>
                                <span className="text-light small">support@shopzone.com</span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="my-4 border-secondary" />
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <p className="mb-0 text-light small">
                            &copy; 2026 All rights reserved. Developed by <Link target='_blank' rel="noopener noreferrer" to="https://www.linkedin.com/in/abdallah-emad-ragab-96b790297" className="text-primary text-decoration-none footer-link">Abdallah Emad Ragab</Link>
                        </p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <div className="d-flex justify-content-md-end gap-3">
                            <a href="#" className="text-light text-decoration-none footer-link" style={{ transition: 'all 0.2s ease' }}>
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                </svg>
                            </a>
                            <a href="#" className="text-light text-decoration-none footer-link" style={{ transition: 'all 0.2s ease' }}>
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 0 3.073 2.293A6.726 6.726 0 0 1 0 13.915a9.19 9.19 0 0 0 5.026 1.46" />
                                </svg>
                            </a>
                            <a href="#" className="text-light text-decoration-none footer-link" style={{ transition: 'all 0.2s ease' }}>
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073.773.078.894l.02.498c.258.585.496 1.11.721 1.629-.086.484-.132.812-.407.953-.106.054-.208.112-.297.19-.27.195-.652.602-.977 1.04-.166.219-.724.725-1.125 1.062-.207.207-.402.356-.579.474-.168.117-.29.19-.347.222-.053.024-.115.048-.151.054-.106.018-.233.006-.348-.01-.119-.018-.237-.048-.363-.083-.118-.037-.242-.085-.383-.145-.166-.074-.301-.15-.413-.229-.111-.08-.296-.17-.462-.283-.166-.113-.321-.23-.465-.343-.123-.113-.234-.226-.346-.36-.114-.134-.205-.23-.306-.334-.1-.103-.183-.215-.279-.349-.098-.135-.191-.267-.282-.42-.09-.152-.179-.321-.258-.488-.08-.167-.158-.339-.226-.52-.069-.181-.132-.382-.187-.604-.056-.223-.11-.473-.158-.734-.05-.262-.094-.549-.126-.847-.032-.298-.052-.595-.065-.882-.01-.187-.02-.363-.03-.549-.01-.185-.01-.37-.01-.555.004-.224.01-.457.02-.694.04-.735.105-1.406.224-2.019.12-.624.28-1.195.495-1.69.218-.502.482-1.004.784-1.462.32-.468.705-.882 1.136-1.236.44-.36.957-.663 1.532-.916.57-.255 1.184-.462 1.855-.627.67-.165 1.355-.294 2.048-.39.693-.096 1.39-.144 2.087-.15.7-.01 1.37.016 2.002.064.63.05 1.183.12 1.655.214.48.098 1.083.276 1.387.52.315.25.556.587.74.994.19.417.34.87.446 1.377.11.507.174 1.04.195 1.597.02.557.006 1.157-.056 1.89-.06 1.096-.206 2.048-.422 2.863-.22.816-.497 1.561-.829 2.226-.334.67-.767 1.296-1.207 1.822-.44.53-.956 1.028-1.52 1.485C9.077 15.32 8.2 15.968 7.486 16.45 6.772 16.93 6.12 17.28 5.513 17.5c-.606.218-1.182.382-1.72.49-.537.11-1.043.164-1.52.164-.475 0-.973-.054-1.493-.164-.519-.11-1.085-.272-1.69-.49-.606-.22-1.258-.57-1.965-1.05C.72 15.68.264 15.03.087 14.49-.08 13.95-.22 13.29-.406 12.51c-.187-.78-.374-1.657-.562-2.54-.19-.88-.375-1.82-.552-2.81-.18-.99-.33-2.01-.45-3.08-.12-1.08-.21-2.15-.27-3.22-.06-1.07-.1-2.15-.15-3.22-.05-1.07-.05-2.16-.05-3.24z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}