import ContentLoader from "react-content-loader";

const CategorySkeleton = () => {
    const renderSkeletons = Array(4)
        .fill(0)
        .map((_, idx) => (
            <div key={idx}
                className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center mb-5 mt-2">
                <ContentLoader
                    speed={2}
                    width={200}
                    height={200}
                    viewBox="0 0 200 200"
                    backgroundColor="#f0f0f0"
                    foregroundColor="#ffffff"
                >
                    <rect x="61" y="179" rx="3" ry="3" width="85" height="6" />
                    <circle cx="104" cy="84" r="84" />
                </ContentLoader>
            </div>
        ));

    return <div className="row">{renderSkeletons}</div>;
};

export default CategorySkeleton;