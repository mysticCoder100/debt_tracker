"use client"

import {Button} from "@/components/ui/button";
import {EyeIcon, EyeOff} from "lucide-react";
import {useState} from "react";
import {currencyConverter} from "@/lib/currency-converter";

function WalletCard({balance, name}: {
    balance: number,
    name: string,
}) {

    const [masked, setMasked] = useState<boolean>(true);
    const maskedBalance = "*******";

    return (
        <div className={""}>
            <h3 className={"mb-4"}>
               <span className={"text-sm"}>
                    Customer
               </span>
                <span className={"font-bold italic"}>{name}</span>
            </h3>
            <div className={"flex items-center gap-2"}>
                <h1 className={"font-black"}>
                    {
                        !masked ? currencyConverter(balance) : maskedBalance
                    }
                </h1>
                <Button
                    variant={"ghost"}
                    className={"hover:bg-transparent h-max hover:font-bold p-0"}
                    onClick={() => {
                        setMasked(!masked)
                    }}
                >
                    {masked ? <EyeIcon/> : <EyeOff/>}
                </Button>
            </div>
            <h5>total debt</h5>
        </div>
    );
}

export default WalletCard;