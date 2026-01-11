"use client"

import {UserWithWalletType} from "@/type/UserType";
import {Button} from "@/components/ui/button";
import {Binoculars, PlusIcon, Trash2} from "lucide-react";
import Link from "next/link";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {DialogBody} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import {AddCustomerForm} from "@/components/AddCustomerForm";
import {DataTableCol} from "@/type/DataTableType";
import DataTable from "@/components/DataTable";
import {Suspense, useEffect, useState} from "react";
import {FormInput, inputProps} from "@/components/FormInputs";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";
import {TableSkeleton} from "@/components/Skeletons";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {deleteUser} from "@/server/delete-user";
import {RowSelector} from "@/components/RowSelector";
import {RowsType} from "@/type/rowsType";
import {Paginator} from "@/components/Paginator";

export default function UsersList({users, search, rows, filteredUsers, page}: {
    users: UserWithWalletType[] | undefined;
    filteredUsers: UserWithWalletType[] | undefined;
    page: number;
    search: string;
    rows: RowsType;
}) {

    const tableColumn: DataTableCol<UserWithWalletType>[] = [
        {
            label: "Name",
            key: "name"
        },
        {
            label: "Phone Number",
            key: "phonenumber"
        },
        {
            label: "Total Debt(s)",
            key: "balance"
        },
        {
            label: "Actions",
            render: ({id, name}: UserWithWalletType) => {
                return (
                    <div className="flex gap-3 justify-end">
                        <Button variant={"success"} size={"sm"} asChild>
                            <Link href={`customers/${id}/wallet`}>
                                <Binoculars/>
                                View
                            </Link>
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant={"destructive"} size={"sm"}> <Trash2/> Delete </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the customer with
                                        name <strong>{name}</strong> account
                                        and remove the data from the server.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={async () => {
                                            await deleteUser(id);
                                        }}
                                    >
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                )
            }
        }
    ];

    const path = usePathname();
    const searchParams = useSearchParams();
    const {replace} = useRouter();

    const [isOpen, setOPen] = useState(false);

    useEffect(() => {
        const searchParam = new URLSearchParams(searchParams);
        searchParam.set("rows", rows.toString());
        searchParam.set("page", page.toString());
        replace(`${path}?${searchParam.toString()}`);
    }, [searchParams, path, replace, rows, page]);

    const handleInputChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set("search", value);
        } else {
            params.delete("search")
        }

        replace(`${path}?${params.toString()}`);
    }, 300)

    const inputProp: inputProps = {
        name: "search",
        noLabel: true,
        label: "Search by Name"
    }

    return (
        <div className="px-5">
            <div className="flex justify-end items-end mb-4 gap-3">
                <FormInput {...inputProp} onInput={handleInputChange} prevContent={search}/>
                <Dialog open={isOpen} onOpenChange={setOPen}>
                    <DialogTrigger asChild>
                        <Button> <PlusIcon/> Add new Customer </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Add a Customer
                            </DialogTitle>
                        </DialogHeader>
                        <DialogBody>
                            <AddCustomerForm onSuccess={() => setOPen(false)}/>
                        </DialogBody>
                    </DialogContent>
                </Dialog>
            </div>

            <RowSelector/>

            <Suspense fallback={<TableSkeleton/>}>
                <DataTable<UserWithWalletType> columns={tableColumn} data={filteredUsers}/>
            </Suspense>

            <Paginator
                totalItems={users?.length ?? 0}
                totalCurrentItems={filteredUsers?.length ?? 0}
            />
        </div>
    );
}

