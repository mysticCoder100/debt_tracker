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
    sum, orderBy, limit, doc, deleteDoc, getDoc, setDoc
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
        try {
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
        } catch (e: unknown) {
            this.catchError(e);
        }
    }

    async totalDebts(): Promise<AggregateSpecData<TotalDebtType>> {
        try {
            const usersCollection = collection(db, this.documents) as CollectionReference<FirestoreUserType, FirestoreUserType>;

            const snapshot = await getAggregateFromServer<TotalDebtType, FirestoreUserType, FirestoreUserType>(usersCollection, {
                total: sum("balance")
            });

            return snapshot.data();
        } catch (e: unknown) {
            this.catchError(e);
        }
    }

    async topFiveDebtors(): Promise<FirestoreUserType[]> {
        try {
            const usersCollection = collection(db, this.documents) as CollectionReference<FirestoreUserType, FirestoreUserType>;
            const q = query(usersCollection, orderBy("balance", "desc"), limit(5));
            const snapshots = await getDocs<FirestoreUserType, FirestoreUserType>(q);

            return snapshots.docs.map(doc => {
                return {...doc.data(), id: doc.id};
            });
        } catch (e: unknown) {
            this.catchError(e);
        }
    }

    async deleteUser(id: string): Promise<boolean> {
        try {
            const userRef = doc(db, this.documents, id);

            await deleteDoc(userRef)

            return true;
        } catch (e: unknown) {
            this.catchError(e);
        }
    }

    async fetch(id: string): Promise<FirestoreUserType> {
        try {
            const docRef = doc(db, this.documents, id);
            const docSnap = await getDoc(docRef);
            return {
                ...docSnap.data(),
                id: docSnap.id
            } as FirestoreUserType;
        } catch (e: unknown) {
            this.catchError(e);
        }
    }

    async updateBalance(userId: string, amount: number): Promise<void> {
        try {
            const userRef = doc(db, this.documents, userId);
            await setDoc(userRef, {balance: amount}, {merge: true});
        } catch (e: unknown) {
            this.catchError(e);
        }
    }
}