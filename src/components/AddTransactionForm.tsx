"use client"

import {FormInput, FormSelectX} from "@/components/FormInputs";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {CircleAlert, Loader, Terminal} from "lucide-react";
import {useActionState, useEffect} from "react";
import {addTransaction} from "@/server/add-transaction";
import {initFormStatus} from "@/type/FormStatus";
import Form from "next/form";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Textarea} from "@/components/ui/textarea";
import {UserType} from "@/type/UserType";
import {clsx} from "clsx";

export function AddTransactionForm({users, onSuccess}: {
    users: UserType[]
    onSuccess?: () => void;
}) {


    const [formStatus, formAction, isPending] = useActionState(addTransaction, initFormStatus);

    const amountInput = {
        type: "text",
        label: "Amount",
        name: "amount",
    }

    const {message, data, formData, status} = formStatus;

    const userOption: { [key: string]: string } = users.reduce((
        acc: { [key: string]: string },
        user
    ) => {
        acc[user.id] = user.name;
        return acc;
    }, {});

    useEffect(() => {
        if (status === 'success') {
            if (onSuccess) onSuccess();
        }
    }, [status, onSuccess]);


    return (
        <Form action={formAction} className="grid gap-5">
            <Alert>
                <Terminal className="h-4 w-4"/>
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription className={"mt-3"}>
                    <div className={"text-red-400"}>
                        <span className={"font-black"}>Debit:</span> Adds the amount to the user&#39;s debit wallet,
                        indicating the user owes you.
                    </div>
                    <div className={"text-green-400 mt-2"}>
                        <span className={"font-bold"}>Credit: </span> Deducts the amount from the user&#39;s debit
                        wallet, reflecting a payment.
                    </div>
                </AlertDescription>
            </Alert>

            {
                status && (
                    <Alert variant={status == "failed" ? "destructive" : "nonDestructive"}>
                        <CircleAlert className="h-4 w-4"/>
                        <AlertDescription>
                            {message.toUpperCase()}
                        </AlertDescription>
                    </Alert>
                )
            }

            <div className={"grid gap-5"}>

                <FormSelectX
                    name={"user_id"}
                    status={status}
                    errorMessage={!(data) || data.user_id}
                    label={"Customer"}
                    options={userOption}
                />

                <FormInput
                    {...amountInput}
                    status={status}
                    prevContent={formData?.get("amount") as string}
                    errorMessage={!(data) || data.amount}
                />

                <FormSelectX
                    name={"transaction_type"}
                    status={status} errorMessage={!(data) || data.transaction_type}
                    label={"Transaction Type"}
                    options={{
                        credit: "Credit",
                        debit: "Debit",
                    }}
                />

                <div>
                    <Label htmlFor={"description"}>Description</Label>
                    <Textarea
                        className={clsx("mt-2", {
                            "ring-2 ring-red-400 ring-offset-2": status === "failed" && data?.description
                        })}
                        id={"description"}
                        name={"description"}
                        defaultValue={formData?.get("description") as string}
                    />
                    {
                        status === "failed" && (
                            <small className="text-red-500"> {!(data) || data.description} </small>
                        )
                    }
                </div>
            </div>

            <Button type="submit" disabled={isPending}>
                {isPending ? (
                    <>
                        <Loader className="animate-spin"/> Loading...
                    </>
                ) : ("Add Transaction")}
            </Button>
        </Form>
    );
}
