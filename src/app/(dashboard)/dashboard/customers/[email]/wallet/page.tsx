import {ChevronLeft} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import WalletCard from "@/components/WalletCard";
import {User} from "@/models/User";
import {notFound} from "next/navigation";
import {UserWithWalletType} from "@/type/UserType";
import Transaction from "@/models/Transaction";
import {TransactionType} from "@/type/TransactionType";
import {AddTransactionDialog} from "@/components/AddTransactionDialog";
import {RowsType, RowsTypeArray} from "@/type/rowsType";
import {TransactionHistory} from "@/components/TransactionHistory";
import {NewUser} from "@/models/NewUser";
import {NewTransaction} from "@/models/NewTransaction";

export default async function Wallet({params, searchParams}: {
    params?: Promise<{ email: string }>
    searchParams?: Promise<{ rows: RowsType, page: number }>
}) {

    const PARAMS = await params;
    const SEARCH_PARAMS = await searchParams;

    const rows = RowsTypeArray.includes(Number(SEARCH_PARAMS?.rows) as RowsType) ?
        Number(SEARCH_PARAMS?.rows) as RowsType :
        5;
    const page = SEARCH_PARAMS?.page ?? 1;
    const id = PARAMS?.email ?? "";

    const startIndex = (page - 1) * rows;
    const endIndex = startIndex + rows;

    const userWallet = await (new NewUser()).fetch(id);

    if (!userWallet) {
        notFound();
    }

    const userTransaction = await (new NewTransaction()).getAUserTransactions(id);

    const filteredUserTransaction = userTransaction?.slice(startIndex, endIndex);


    return (
        <section className={"grid grid-rows-[auto_auto_1fr] h-full *:p-8"}>
            <div className={"mt-2 !p-4"}>
                <Button asChild variant={"link"}>
                    <Link className={"flex"} href={"/dashboard/customers"}>
                        <ChevronLeft/>
                        Back
                    </Link>
                </Button>
            </div>
            <div className={"bg-blue-400 mt-2 rounded-2xl m-4 flex flex-col md:flex-row gap-6 md:items-end" +
                " md:justify-between"}>

                <WalletCard balance={userWallet.balance} name={userWallet.name}/>

                <AddTransactionDialog user={userWallet}/>

            </div>

            <div className={""}>
                <h2 className={"mb-6"}>All Transactions Details</h2>
                <TransactionHistory
                    userTransaction={userTransaction}
                    rows={rows}
                    filteredUserTransaction={filteredUserTransaction}
                    page={page}
                />
            </div>
        </section>
    );
}
