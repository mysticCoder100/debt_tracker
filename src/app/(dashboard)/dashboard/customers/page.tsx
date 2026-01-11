import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList, BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import UsersList from "@/components/UsersList";
import {UserWithWalletType} from "@/type/UserType";
import {User} from "@/models/User";
import {RowsType, RowsTypeArray} from "@/type/rowsType";

export default async function Customer({searchParams}: {
    searchParams?: Promise<{ search: string, rows: RowsType, page: number }>
}) {

    const searchedItem = await searchParams;
    const search = searchedItem?.search ?? "";
    const rows = RowsTypeArray.includes(Number(searchedItem?.rows) as RowsType) ?
        Number(searchedItem?.rows) as RowsType :
        5;

    const page = searchedItem?.page ?? 1;

    let users = !search ?
        await (new User()).fetchWithWallet<UserWithWalletType>() :
        await (new User()).fetchBySearch<UserWithWalletType>(search);

    users = users?.sort((a, b) => a.name.localeCompare(b.name));


    const startIndex = (page - 1) * rows;
    const endIndex = startIndex + rows;

    const filteredUsers = users?.slice(startIndex, endIndex);

    return (
        <div className="pb-5">
            <Breadcrumb className="py-10 px-5">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-3xl">Customers</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <UsersList users={users} search={search} rows={rows} filteredUsers={filteredUsers} page={page}/>
        </div>
    );
}
