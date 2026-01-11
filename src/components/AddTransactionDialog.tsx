"use client"

import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import {AddTransactionForm} from "@/components/AddTransactionForm";
import {useState} from "react";
import {UserType} from "@/type/UserType";

export function AddTransactionDialog({user}: {
    user: UserType
}) {

    const [isOpen, setOPen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setOPen}>
            <DialogTrigger asChild>
                <Button variant={"secondary"}>
                    <PlusIcon/>
                    <span className={""}>Add Transaction</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Transaction</DialogTitle>
                </DialogHeader>

                <AddTransactionForm users={[user]} onSuccess={() => setOPen(false)}/>

            </DialogContent>
        </Dialog>
    )
}