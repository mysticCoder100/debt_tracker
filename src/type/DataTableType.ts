import React from "react";

export type DataTableType<Row> = {
    columns: DataTableCol<Row>[];
    data: Row[] | undefined;
}

export type DataTableCol<Row> = {
    label: string;
    key?: keyof Row;
    render?: (row: Row) => React.ReactNode;
}