import { memo } from "react";

export default memo(function Heading({ title }: { title: React.ReactNode }) {
    return (
        <h1 className="display-4 fw-bold text-primary text-center">{title}</h1>
    );
});