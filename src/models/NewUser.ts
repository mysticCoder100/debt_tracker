import {FirebaseModel} from "@/models/FirebaseModel";
import {db} from "@/lib/firbase";
import {
    AggregateSpecData,
    collection,
    CollectionReference, count,
    getAggregateFromServer,
    getDocs,
    query,
    where,
    sum, orderBy, limit, doc, deleteDoc
} from "firebase/firestore";
import {DebtorCountType, TotalDebtType} from "@/type/DebtorCountType";
import {FirestoreUserType} from "@/type/UserType";

export class NewUser extends FirebaseModel {
    constructor() {
        super("users");
    }

    async fetchBySearch<T>(search: string): Promise<T[]> {
        try {
            const userCollection = collection(db, this.documents) as CollectionReference<T>;

            const q = query(
                userCollection,
                where("name", ">=", search),
                where("name", "<=", search + "\uf8ff")
            )
            const snapShot = await getDocs(q);

            return snapShot.docs.map(doc => doc.data());
        } catch (e: unknown) {
            this.catchError(e);
        }
    }

    async fetchDebtorsSummary(): Promise<AggregateSpecData<DebtorCountType>> {
        const userCollection = collection(db, this.documents);

        const debtorQuery = query(userCollection, where("balance", ">", 0));
        const nonDebtorQuery = query(userCollection, where("balance", "<=", 0));

        const [debtorSnap, nonDebtorSnap] = await Promise.all([
            getAggregateFromServer(debtorQuery, {debtorCount: count()}),
            getAggregateFromServer(nonDebtorQuery, {nonDebtorCount: count()})
        ]);

        return {
            debtor: debtorSnap.data().debtorCount,
            non_debtor: nonDebtorSnap.data().nonDebtorCount
        };
    }

    async totalDebts(): Promise<AggregateSpecData<TotalDebtType>> {
        const usersCollection = collection(db, this.documents) as CollectionReference<FirestoreUserType, FirestoreUserType>;

        const snapshot = await getAggregateFromServer<TotalDebtType, FirestoreUserType, FirestoreUserType>(usersCollection, {
            total: sum("balance")
        });

        return snapshot.data();
    }

    async topFiveDebtors(): Promise<FirestoreUserType[]> {
        const usersCollection = collection(db, this.documents) as CollectionReference<FirestoreUserType, FirestoreUserType>;
        const q = query(usersCollection, orderBy("balance", "desc"), limit(5));
        const snapshots = await getDocs<FirestoreUserType, FirestoreUserType>(q);

        return snapshots.docs.map(doc => {
            return {...doc.data(), id: doc.id};
        });
    }

    async deleteUser(id: string): Promise<boolean> {
        try {
            const userRef = doc(db, this.documents, id);

            await deleteDoc(userRef)

            return true;
        } catch (e) {
            return false;
        }
    }
}