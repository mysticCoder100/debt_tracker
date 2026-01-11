"use client"

import React, {useEffect} from 'react';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {RowsType} from "@/type/rowsType";
import {Button} from "@/components/ui/button";
import {clsx} from "clsx";
import {ChevronLeft, ChevronRight} from "lucide-react";

export function Paginator({totalItems, totalCurrentItems}: {
    totalItems: number;
    totalCurrentItems: number;
}) {

    const {replace} = useRouter();
    const path = usePathname();
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const searchParams = useSearchParams();

    useEffect(() => {
        const rowsFromParams = Number(searchParams.get("rows")) || 0;
        const pageFromParams = Number(searchParams.get("page")) || 1;
        setCurrentPage(pageFromParams);
        if (rowsFromParams > 0) {
            const calculatedRows = rowsFromParams as RowsType;
            const calculatedTotalPages = Math.ceil(totalItems / calculatedRows);
            setTotalPages(calculatedTotalPages);
        }
    }, [searchParams, totalItems]);


    const handlePageClick = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        replace(`${path}?${params.toString()}`);
    }

    return (
        <div className={"w-full gap-2 items-center flex justify-center mt-4"}>
            <Button
                className={clsx({})}
                variant={"default"}
                size={"sm"}
                disabled={currentPage === 1}
                onClick={() => handlePageClick(currentPage - 1)}
            >
                <ChevronLeft/>
                Prev
            </Button>

            <p className={"text-sm"}>
                {`Showing ${totalCurrentItems} items out of ${totalItems} items {page ${currentPage} of ${totalPages}}`}
            </p>

            <Button
                className={clsx({})}
                variant={"default"}
                size={"sm"}
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => handlePageClick(currentPage + 1)}
            >
                Next
                <ChevronRight/>
            </Button>
        </div>
    );
}
