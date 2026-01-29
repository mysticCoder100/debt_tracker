import {AddCustomerForm} from "@/components/AddCustomerForm";
import {Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage} from "@/components/ui/breadcrumb";
import {AddTransactionForm} from "@/components/AddTransactionForm";
import {FirestoreUserType} from "@/type/UserType";
import {User} from "@/models/User";
import {NewUser} from "@/models/NewUser";

export default async function AddTransactions() {

    let users: FirestoreUserType[] | undefined = await (new NewUser()).fetchAll<FirestoreUserType>();

    if (users == undefined || users.length === 0) {
        users = []
    }

    return (
        <div className="add-transaction pb-3 grid grid-flow-row h-full">
            <Breadcrumb className="py-10 px-5">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-3xl">
                            Add Transactions
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col lg:grid lg:grid-cols-2 w-full mx-auto *:p-5">
                <div className="grid place-items-center w-full">
                    <div className={"w-full max-w-[30rem]"}>
                        <h3 className="mb-5">Add Transaction</h3>
                        <AddTransactionForm users={users}/>
                    </div>
                </div>

                <div
                    className="border-t lg:border-l lg:border-t-0 border-t-gray-300 lg:border-l-gray-300 grid place-items-center w-full">
                    <div className={"w-full max-w-[30rem]"}>
                        <h3 className="mb-5">Add Customer</h3>
                        <AddCustomerForm/>
                    </div>
                </div>

            </div>
        </div>
    );
}
