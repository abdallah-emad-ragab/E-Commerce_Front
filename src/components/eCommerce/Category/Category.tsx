import { Link } from "react-router-dom";

interface IProps {
    title: string,
    prefix: string,
    img: string
}

const Category = (props: IProps) => {
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <Link
                to={`/categories/products/${props.prefix}`}
                className="text-decoration-none"
            >
                <div className="card h-100 border-0 shadow-sm hover-lift text-center">
                    <div className="card-body d-flex flex-column align-items-center p-4">
                        <div
                            className="bg-light rounded-circle d-flex align-items-center justify-content-center mb-3"
                            style={{ width: '120px', height: '120px' }}
                        >
                            <img
                                src={props.img}
                                alt={props.title}
                                className="img-fluid rounded-circle"
                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                            />
                        </div>
                        <h5 className="card-title text-primary fw-semibold mb-0">
                            {props.title}
                        </h5>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Category;