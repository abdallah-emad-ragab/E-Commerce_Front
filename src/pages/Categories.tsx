import { Category } from "../components/eCommerce"
import { Loading } from "../components/feedback";
import GridList from "../components/common/GridList/GridList";
import type { TCategory } from "../types/category";
import { Heading } from "../components/common";
import useCategories from "../hooks/useCategories";

export default function Categories() {
    const { loading, records, error } = useCategories();

    return (
        <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
            <div className="container py-5">
                <div className="text-center mb-5">
                    <Heading title="Shop by Category" />
                    <p className="lead text-muted mt-3">
                        Explore our wide range of product categories and find exactly what you're looking for.
                    </p>
                </div>
                <Loading status={loading} error={error || ""} type="category">
                    <GridList<TCategory>
                        records={records}
                        emptyMessage="No categories found"
                        renderItem={(record) => <Category {...record} />}
                    />
                </Loading>
            </div>
        </div>
    )
}