import type { TProduct } from "../../../types/products";
import { addToCart } from "../../../store/cart/cartSlice";
import { useAppDispatch } from "../../../store/hooks";
import { memo, useEffect, useState } from "react";
import Like from '../../../assets/svg/Like.svg?react';
import LikeFill from '../../../assets/svg/LikeFill.svg?react';
import { thunkWishlist } from "../../../store/wishlist/wishlistSlice";
import { Link } from "react-router-dom";

const Product = memo(({ id, title, cat_prefix, price, img, max, quantity, isWishlisted, isAuthenticated }: TProduct) => {
    const dispatch = useAppDispatch();
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const currentRemainingQuantity = max - (quantity || 0);

    const addToCartHandler = () => {
        dispatch(addToCart(id));
        setIsBtnDisabled(true);
    }

    const addToWishlistHandler = () => {
        if (isAuthenticated) {
            if (isLoading) return;
            setIsLoading(true);
            dispatch(thunkWishlist(id)).unwrap().then(() => setIsLoading(false))
                .catch(() => setIsLoading(false));
        } else {
            setShowModal(true);
        }
    }

    useEffect(() => {
        if (isBtnDisabled === false) return;
        const debounce = setTimeout(() => { setIsBtnDisabled(false) }, 300);
        return () => clearTimeout(debounce);
    }, [isBtnDisabled])

    return (
        <>
            {/* Modal for adding to wishlist */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex={-1} style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-primary">Login Required</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)} />
                        </div>
                        <div className="modal-body">
                            <p className="mb-0">Please log in to add items to your wishlist.</p>
                        </div>
                        <div className="modal-footer">
                            <Link to="/login" className="btn btn-accent text-primary" onClick={() => setShowModal(false)}>
                                Login
                            </Link>
                            <button type="button" className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Card */}
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
                <div className="card h-100 border-0 shadow-sm hover-lift">
                    <div className="position-relative">
                        <div className="card-img-top bg-light d-flex align-items-center justify-content-center"
                             style={{ height: '250px', overflow: 'hidden' }}>
                            <img
                                src={img}
                                alt={title}
                                className="img-fluid p-3"
                                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                            />
                        </div>
                        <button
                            className="btn position-absolute top-0 end-0 m-2 p-2 rounded-circle bg-white border-0 shadow-sm"
                            onClick={addToWishlistHandler}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
                            ) : isWishlisted ? (
                                <LikeFill className="text-accent" style={{ width: '20px', height: '20px' }} />
                            ) : (
                                <Like className="text-muted" style={{ width: '20px', height: '20px' }} />
                            )}
                        </button>
                        {currentRemainingQuantity <= 0 && (
                            <div className="position-absolute top-50 start-50 translate-middle">
                                <span className="badge bg-danger fs-6 px-3 py-2">Out of Stock</span>
                            </div>
                        )}
                    </div>
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title text-primary fw-semibold mb-2" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: '1.4',
                            minHeight: '2.8em'
                        }}>
                            {title}
                        </h5>
                        <p className="text-muted small text-capitalize mb-2">{cat_prefix}</p>
                        <div className="mt-auto">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="h4 text-primary fw-bold mb-0">
                                    ${price.toFixed(2)}
                                </span>
                                {currentRemainingQuantity > 0 && (
                                    <small className="text-muted">
                                        {currentRemainingQuantity} left
                                    </small>
                                )}
                            </div>
                            <button
                                className="btn btn-accent w-100 text-primary fw-bold"
                                disabled={isBtnDisabled || currentRemainingQuantity <= 0}
                                onClick={addToCartHandler}
                                style={{
                                    padding: '0.6rem 1rem',
                                    borderRadius: '8px',
                                    fontSize: '0.95rem',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {isBtnDisabled ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Adding...
                                    </>
                                ) : currentRemainingQuantity <= 0 ? (
                                    'Out of Stock'
                                ) : (
                                    'Add to Cart'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

export default Product;