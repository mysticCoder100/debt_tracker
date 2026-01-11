import React from 'react';
import {LucideIcon} from "lucide-react";
import {currencyConverter, numberConverter} from "@/lib/currency-converter";

function DashboardCard({Icon, label, value}: {
    label: string,
    value: number,
    Icon: LucideIcon
}) {
    return (
        <div className={"flex items-center p-12 justify-between border-[.1em] rounded-2xl shadow"}>
            <div>
                <h2 className={"font-black"}>
                    {
                        label.toLowerCase() == "debt" ? currencyConverter(value) : numberConverter(value)
                    }
                </h2>
                <p className={"text-gray-500 text-xs"}>{label}(s)</p>
            </div>
            <div className={"hidden md:grid bg-blue-300 text-white items-center rounded-full w-[4em]" +
                " aspect-square"}>
                <Icon className={"m-auto"} width={30} height={30}/>
            </div>
        </div>
    );
}

export default DashboardCard;