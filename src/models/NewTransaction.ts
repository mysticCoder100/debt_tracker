import {FirebaseModel} from "@/models/FirebaseModel";
import {collection, doc, getDocs, query, runTransaction, where} from "firebase/firestore";
import {db} from "@/lib/firbase";
import {TransactionType} from "@/type/TransactionType";

export class NewTransaction extends FirebaseModel {
    constructor() {
        super("transactions");
    }

    async addTransaction(userId: string, transactionData: TransactionType): Promise<void> {
        const userRef = doc(db, "users", userId);
        const newTxRef = doc(collection(db, "transactions"));

        try {

            await runTransaction(db, async (transaction) => {
                const userDoc = await transaction.get(userRef);

                if (transactionData.transaction_type == 'credit' && transactionData.amount > userDoc.data()?.balance) {
                    throw new Error("Crediting amount exceeds customer's debt.");
                }

                /*
                 * This is to perform these actions;
                 * 1. Add to the debit wallet if the transaction is debit.
                 * 2. Subtract from the debit wallet if the transaction is credit.
                 * */
                const updatedBalance = transactionData.transaction_type == "debit" ? transactionData.amount + userDoc.data()?.balance : userDoc.data()?.balance - transactionData.amount;

                transaction.update(userRef, {balance: updatedBalance});
                transaction.set(newTxRef, transactionData);

            });
        } catch (e: unknown) {
            this.catchError(e);
        }
    }

    async getAUserTransactions(userId: string): Promise<TransactionType[]> {
        try {
            const userColl = collection(db, this.documents);

            const q = query(userColl, where("user_id", "==", userId));
            const querySnapshots = await getDocs(q);
            return querySnapshots.docs.map(doc => {
                return {...doc.data(), id: doc.id, created_at: doc.data().created_at?.toDate().toISOString()}
            }) as TransactionType[];
        } catch (e: unknown) {
            this.catchError(e);
        }
    }
}