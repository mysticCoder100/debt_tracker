import React, {Suspense} from "react";
import {Binoculars, TrendingDown, UserCheck, UserMinus, Users} from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import {User} from "@/models/User";
import {UserWithWalletType} from "@/type/UserType";
import {DataTableCol} from "@/type/DataTableType";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import DataTable from "@/components/DataTable";
import {Wallet} from "@/models/Wallet";
import {DebtorBar} from "@/components/DebtorsBar";
import {DashboardCardSkeleton} from "@/components/Skeletons";

export default async function Dashboard() {

    const totalUsers = await (new User()).count<{ total: number }>();
    const totalDebts = await (new Wallet()).allDebts<{ total: number }>();
    const debtorsCounts = await (new Wallet()).debtorsCount<DebtorCountType>();

    const totalUsersCount = totalUsers?.total ?? 0;
    const totalDebtorsCount = debtorsCounts?.debtor ?? 0;
    const nonDebtors = debtorsCounts?.non_debtor ?? 0;

    const dashboardCardContent = [
        {label: "Debt", value: totalDebts?.total || 0, icon: TrendingDown},
        {label: "Debtor", value: totalDebtorsCount, icon: UserMinus},
        {label: "Non Debtor", value: nonDebtors, icon: UserCheck},
        {label: "Customer", value: totalUsersCount, icon: Users}
    ];

    const topFiveDebtors = await (new User()).fetchTopFiveDebtors<UserWithWalletType>();

    type DebtorCountType = {
        debtor: number;
        non_debtor: number;
    };

    const chartLabel = ["Debtors", "Non-Debtors"];
    const chartData = [debtorsCounts?.debtor || 0, debtorsCounts?.non_debtor || 0];

    const tableColumns: DataTableCol<UserWithWalletType>[] = [
        {label: "Name", key: "name"},
        {label: "Total Debt(s)", key: "balance"},
        {
            label: "Actions",
            render: ({id}: UserWithWalletType) => (
                <div className="flex justify-end">
                    <Button variant="success" size="sm" asChild>
                        <Link href={`/dashboard/customers/${id}/wallet`}>
                            <Binoculars/>
                            View
                        </Link>
                    </Button>
                </div>
            )
        }
    ];

    return (
        <section className="*:px-5 grid grid-rows-[auto_auto_1fr] h-full">
            <h2 className="py-10">Dashboard</h2>

            <section className="grid w-full gap-10 grid-component">
                {dashboardCardContent.map((card, index) => (
                    <Suspense key={index} fallback={<DashboardCardSkeleton/>}>
                        <DashboardCard {...card} Icon={card.icon}/>
                    </Suspense>
                ))}
            </section>

            <section className="mt-12 grid grid-flow-row gap-6 lg:grid-cols-2 mb-3">
                <div
                    className="w-full overflow-hidden grid content-between *:p-5 shadow rounded-lg grid-rows-[auto_1fr]">
                    <div>
                        <h3>Debtor Breakdown</h3>
                    </div>
                    <div className={"grid place-items-center grid-cols-[1fr]"}>
                        <DebtorBar label={chartLabel} data={chartData}/>
                    </div>
                </div>
                <div className="*:p-5 shadow rounded-lg overflow-hidden">
                    <div>
                        <h3 className="text-right">Top 5 Debtors</h3>
                    </div>
                    <DataTable<UserWithWalletType> columns={tableColumns} data={topFiveDebtors}/>
                </div>
            </section>
        </section>
    );
}
