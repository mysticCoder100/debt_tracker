import React from 'react';
import {DataTableType} from "@/type/DataTableType";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {clsx} from "clsx";
import {currencyConverter, dateConverter} from "@/lib/currency-converter";

function DataTable<Row>({columns, data}: DataTableType<Row>) {
    return (
        <Table className="table-auto">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">S/N</TableHead>
                    {
                        columns.map((column, index) => {
                            return (
                                <TableHead key={index} className={clsx({
                                    'text-right': (column.label).toLowerCase() == "actions"
                                })}> {column.label} </TableHead>
                            )
                        })
                    }
                </TableRow>
            </TableHeader>

            <TableBody>
                {!data || data.length == 0 ? (
                    <TableRow>
                        <TableCell className="text-center" colSpan={columns.length + 1}>
                            No Record Found
                        </TableCell>
                    </TableRow>
                ) : (
                    data.map((row, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell className="font-medium">
                                    {index + 1}
                                </TableCell>

                                {
                                    columns.map((col, index) => {

                                        let cellContent: React.ReactNode = null;
                                        if (col.key) {
                                            switch (col.key) {
                                                case 'balance':
                                                case 'amount':
                                                    cellContent = currencyConverter(row[col.key] as unknown as number);
                                                    break;
                                                case 'created_at':
                                                    cellContent = dateConverter(row[col.key] as unknown as Date);
                                                    break;
                                                default:
                                                    cellContent = row[col.key] as React.ReactNode;
                                            }
                                        } else if (col.render) {
                                            cellContent = col.render(row);
                                        }

                                        return (
                                            <TableCell key={index}>
                                                {cellContent as React.ReactNode}
                                            </TableCell>
                                        )
                                    })
                                }

                            </TableRow>
                        )
                    })
                )}
            </TableBody>

        </Table>
    );
}

export default DataTable;