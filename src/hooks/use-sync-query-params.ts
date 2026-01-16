import {useEffect} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export function useSyncQueryParams(rows: number, page: number) {
    const path = usePathname();
    const searchParams = useSearchParams();
    const {replace} = useRouter();

    useEffect(() => {
        const currentRows = searchParams.get("rows");
        const currentPage = searchParams.get("page");

        if (currentRows !== rows.toString() || currentPage !== page.toString()) {
            const params = new URLSearchParams(searchParams);
            params.set("rows", rows.toString());
            params.set("page", page.toString());
            replace(`${path}?${params.toString()}`);
        }
    }, [rows, page, path, replace, searchParams]);
}