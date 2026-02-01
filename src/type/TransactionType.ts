import z from "zod"

export type TransactionType = {
    id?: string;
    user_id: string;
    transaction_type: "credit" | "debit";
    amount: number;
    description: string;
    created_at?: Date;
}

export const TransactionTypeSchema = z.object({
    user_id: z.string().nonempty("Customer is required"),
    transaction_type: z.enum(["credit", "debit"]),
    description: z.string(),
    amount: z.number().positive("Amount is required"),
})