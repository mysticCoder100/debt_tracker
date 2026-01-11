"use server"

import {formStatusType} from "@/type/FormStatus";
import {TransactionTypeSchema} from "@/type/TransactionType";
import Transaction from "@/models/Transaction";
import {revalidatePath} from "next/cache";
import {User} from "@/models/User";
import {UserWithWalletType} from "@/type/UserType";

export async function addTransaction(formStatus: formStatusType, formData: FormData): Promise<formStatusType> {
    const validateFields = TransactionTypeSchema.safeParse({
        ...Object.fromEntries(formData.entries()),
        amount: Number(formData.get("amount")),
        user_id: Number(formData.get("user_id")),
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

        if (transaction_type == 'credit') {
            const currentDebit = await (new User()).fetchWallet<UserWithWalletType>(Number(user_id))

            if (currentDebit && (amount * 100) > currentDebit?.balance) {
                return {
                    status: "failed",
                    message: "Crediting amount exceeds Customer's debit",
                    formData
                }
            }

        }

        await (new Transaction()).insert(
            [user_id, transaction_type, amount * 100, description],
            ["user_id", "transaction_type", "amount", "description"],
        )

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