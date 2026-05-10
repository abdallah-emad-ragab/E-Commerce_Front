export default function AboutUs() {
    return (
        <div style={{ backgroundColor: '#FFFFFF', minHeight: '80vh', padding: '2rem' }}>
            <h1 className="display-4 fw-bold text-primary text-center">About Us</h1>
            <p className="lead text-center text-secondary mb-5">
                Welcome to ShopZone, your one-stop destination for all your shopping needs! We are passionate about providing you with a seamless and enjoyable shopping experience, offering a wide range of products at competitive prices.
            </p>
            <div className="container">
                <h2 className="text-primary mb-4">Our Mission</h2>
                <p className="mb-5">
                    At ShopZone, our mission is to make online shopping easy, convenient, and accessible for everyone. We strive to offer a diverse selection of high-quality products, exceptional customer service, and a user-friendly platform that allows you to shop with confidence.
                </p>
                <h2 className="text-primary mb-4">Our Vision</h2>
                <p className="mb-5">
                    Our vision is to be the most trusted and preferred online shopping destination for customers worldwide, known for our commitment to quality, innovation, and customer satisfaction.
                </p>
            </div>
        </div>
    )
}