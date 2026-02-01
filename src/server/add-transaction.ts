"use server"

import {formStatusType} from "@/type/FormStatus";
import {TransactionType, TransactionTypeSchema} from "@/type/TransactionType";
import Transaction from "@/models/Transaction";
import {revalidatePath} from "next/cache";
import {User} from "@/models/User";
import {UserWithWalletType} from "@/type/UserType";
import {NewUser} from "@/models/NewUser";
import {NewTransaction} from "@/models/NewTransaction";

export async function addTransaction(formStatus: formStatusType, formData: FormData): Promise<formStatusType> {
    const validateFields = TransactionTypeSchema.safeParse({
        ...Object.fromEntries(formData.entries()),
        amount: Number(formData.get("amount")),
        user_id: formData.get("user_id"),
    })

    if (!validateFields.success) {
        return {
            status: "failed",
            message: "validation error",
            data: validateFields.error.flatten().fieldErrors,
            formData
        }
    }

    const {user_id, amount, transaction_type, description} = validateFields.data;

    try {

        const amountToInsert = amount * 100;

        const transactionData: TransactionType = {
            user_id,
            transaction_type,
            amount: amountToInsert,
            description,
            created_at: new Date()
        };

        await (new NewTransaction()).addTransaction(user_id, transactionData);

        revalidatePath("/dashboard/customers/[email]/wallet");

        return {
            status: "success",
            message: "Transaction Added Successfully",
        }

    } catch (e) {
        return {
            status: "failed",
            message: "server error",
        }
    }
}