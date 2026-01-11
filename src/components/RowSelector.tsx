import React from 'react';
import {clsx} from "clsx";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {RowsTypeArray} from "@/type/rowsType";

export function RowSelector() {

    const path = usePathname();
    const searchParams = useSearchParams();
    const {replace} = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set("rows", value);
            params.set("page", "1");
        } else {
            params.delete("rows");
        }

        replace(`${path}?${params.toString()}`);
    }

    return (
        <div className={"my-2 flex justify-end"}>
            <div className={"flex items-center gap-4"}>
                <label htmlFor="" className={"text-sm"}>
                    Rows per page:
                </label>
                <select
                    className={clsx("flex mt-2 mb-1 h-8 items-center justify-between rounded-md" +
                        " border border-neutral-200 bg-white px-3 text-sm ring-offset-white" +
                        " placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus:ring-neutral-300")}
                    onChange={handleChange}
                    defaultValue={searchParams.get("rows") || ""}
                >
                    {
                        RowsTypeArray.map((item, index) => {
                            return <option key={index} value={item}>{item}</option>
                        })
                    }
                </select>
            </div>
        </div>
    );
}
