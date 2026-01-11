import z from "zod"

export type TransactionType = {
    id: number;
    user_id: number;
    transaction_type: "credit" | "debit";
    amount: number;
    description: string;
    created_at: Date;
}

export const TransactionTypeSchema = z.object({
    user_id: z.number().positive("Customer is required"),
    transaction_type: z.string().nonempty("Transaction type is required"),
    description: z.string(),
    amount: z.number().positive("Amount is required"),
})