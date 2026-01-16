"use client"

import Form from "next/form";
import {Button} from "@/components/ui/button";
import {addCustomer} from "@/server/add-customer";
import {useActionState, useEffect} from "react";
import {formStatusType, initFormStatus} from "@/type/FormStatus";
import {CircleAlert, Loader} from "lucide-react";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {FormInput} from "@/components/FormInputs";
import {NewUser} from "@/models/NewUser";


export function AddCustomerForm({onSuccess}: { onSuccess?: () => void }) {

    const [formStatus, formAction, isPending] = useActionState<formStatusType, FormData>(addCustomer, initFormStatus);

    const fields = [
        {
            type: "text",
            label: "Name",
            name: "name",
        }, {
            type: "text",
            label: "Phone Number",
            name: "phonenumber",
        },
    ]

    const {message, data, formData, status} = formStatus;

    useEffect(() => {
        if (status === 'success') {
            if (onSuccess) onSuccess();
        }
    }, [status, onSuccess]);

    return (
        <Form action={formAction} className="grid gap-4">
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

            <div className="flex flex-col gap-5">
                {
                    fields.map((field, i) => (
                        <FormInput
                            key={i}
                            prevContent={formData?.get(field.name) as string}
                            status={status}
                            errorMessage={!(data) || data[field.name]}
                            {...field}
                        />
                    ))
                }
            </div>
            <Button type="submit" disabled={isPending}>
                {isPending ? (
                    <>
                        <Loader className="animate-spin"/> Loading...
                    </>
                ) : ("Add Customer")}
            </Button>
        </Form>
    );
}
