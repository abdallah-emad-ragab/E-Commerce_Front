import React from "react";
import { LottieHandler } from "../../feedback";

type GridListProps<T> = {
    records: T[];
    renderItem: (record: T) => React.ReactNode;
    emptyMessage?: string;
}
type HasID = { id?: number }

export default function GridList<T extends HasID>({ records, renderItem, emptyMessage }: GridListProps<T>) {
    const recordsList = records.length > 0 ? records.map((record) => (
        <React.Fragment key={record.id}>
            {renderItem(record)}
        </React.Fragment>
    )) : <LottieHandler type="cart_empty" message={emptyMessage} />;

    return (
        <div className="row">
            {recordsList}
        </div>
    )
}