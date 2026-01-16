"use client"

import React, {Suspense, useEffect} from 'react';
import {RowSelector} from "@/components/RowSelector";
import DataTable from "@/components/DataTable";
import {TransactionType} from "@/type/TransactionType";
import {DataTableCol} from "@/type/DataTableType";
import {RowsType} from "@/type/rowsType";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Paginator} from "@/components/Paginator";
import {TableSkeleton} from "@/components/Skeletons";
import {useSyncQueryParams} from "@/hooks/use-sync-query-params";

export function TransactionHistory({rows, userTransaction, filteredUserTransaction, page}: {
    rows: RowsType,
    page: number,
    filteredUserTransaction: TransactionType[] | undefined,
    userTransaction: TransactionType[] | undefined
}) {

    const tableColumn: DataTableCol<TransactionType>[] = [
        {
            label: "Date",
            key: "created_at"
        },
        {
            label: "Transaction Type",
            key: "transaction_type",
        },
        {
            label: "Amount",
            key: "amount"
        },
        {
            label: "Description",
            key: "description"
        }

    ]

    useSyncQueryParams(rows, page);

    return (
        <div>
            <RowSelector/>
            <Suspense fallback={<TableSkeleton/>}>
                <DataTable<TransactionType> columns={tableColumn} data={filteredUserTransaction}/>
            </Suspense>
            <Paginator
                totalItems={userTransaction?.length ?? 0}
                totalCurrentItems={filteredUserTransaction?.length ?? 0}
            />
        </div>
    );
}
