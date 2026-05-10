import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <section className="py-5 bg-primary text-white position-relative overflow-hidden">
                <div className="container">
                    <div className="row align-items-center min-vh-75">
                        <div className="col-lg-6 text-center text-lg-start">
                            <h1 className="display-3 fw-bold mb-4 text-accent" style={{ fontSize: '3.5rem' }}>
                                Welcome to ShopZone
                            </h1>
                            <p className="lead mb-4 text-light fs-5">
                                Discover premium products with exceptional quality, unbeatable prices, and lightning-fast delivery.
                            </p>
                            <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                                <Link to="/categories" className="btn btn-accent btn-lg px-5 py-3 fw-bold text-primary">
                                    Shop Now
                                </Link>
                                <Link to="/about-us" className="btn btn-outline-light btn-lg px-5 py-3 fw-bold">
                                    Learn More
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6 mt-5 mt-lg-0 text-center">
                            <div className="position-relative">
                                <img
                                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                                    alt="Modern Shopping Experience"
                                    className="img-fluid rounded-4 shadow-lg"
                                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                                />
                                <div className="position-absolute top-0 end-0 bg-accent text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold"
                                    style={{ width: '80px', height: '80px', marginTop: '-20px', marginRight: '-20px', fontSize: '1.2rem' }}>
                                    New
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-5" style={{ backgroundColor: '#FFFFFF' }}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="display-4 fw-bold text-primary mb-3">Why Choose ShopZone?</h2>
                        <p className="lead text-muted fs-5">Experience shopping like never before with our premium services</p>
                    </div>
                    <div className="row g-4">
                        {/* Fast Delivery */}
                        <div className="col-lg-4 col-md-6">
                            <div className="card h-100 border-0 shadow-sm hover-lift">
                                <div className="card-body text-center p-4">
                                    <div className="bg-accent bg-opacity-25 rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                                        style={{ width: '90px', height: '90px' }}>
                                        <svg width="40" height="40" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="text-white">
                                            <path d="M3 3h13v13H3z" />
                                            <path d="M16 8h4l2 3v5h-6z" />
                                            <circle cx="7.5" cy="18.5" r="1.5" />
                                            <circle cx="17.5" cy="18.5" r="1.5" />
                                        </svg>
                                    </div>
                                    <h5 className="card-title fw-bold text-primary mb-3 fs-5">Fast Delivery</h5>
                                    <p className="card-text text-muted">
                                        Lightning-fast delivery to your doorstep with real-time tracking and secure packaging.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Secure Payment */}
                        <div className="col-lg-4 col-md-6">
                            <div className="card h-100 border-0 shadow-sm hover-lift">
                                <div className="card-body text-center p-4">
                                    <div className="bg-accent bg-opacity-25 rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                                        style={{ width: '90px', height: '90px' }}>
                                        <svg width="40" height="40" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="text-white">
                                            <rect x="3" y="11" width="18" height="10" rx="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                    </div>
                                    <h5 className="card-title fw-bold text-primary mb-3 fs-5">Secure Payment</h5>
                                    <p className="card-text text-muted">
                                        Multiple secure payment options with bank-grade encryption and fraud protection.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Premium Quality */}
                        <div className="col-lg-4 col-md-6">
                            <div className="card h-100 border-0 shadow-sm hover-lift">
                                <div className="card-body text-center p-4">
                                    <div className="bg-accent bg-opacity-25 rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                                        style={{ width: '90px', height: '90px' }}>
                                        <svg width="40" height="40" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="text-white">
                                            <path d="M12 17l-5 3 1-6-4-4 6-.5L12 4l2 5.5 6 .5-4 4 1 6z" />
                                        </svg>
                                    </div>
                                    <h5 className="card-title fw-bold text-primary mb-3 fs-5">Premium Quality</h5>
                                    <p className="card-text text-muted">
                                        Carefully curated products from trusted brands with rigorous quality assurance.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}