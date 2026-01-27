import {FirebaseError} from "@firebase/util";
import {FirestoreError} from "@/error/FirestoreError";
import {db} from "@/lib/firbase";
import {
    addDoc,
    collection,
    query,
    where as fireWhere,
    getCountFromServer, CollectionReference, getDocs, QuerySnapshot, WhereFilterOp,
} from "firebase/firestore";


export abstract class FirebaseModel {
    protected documents: string;

    protected constructor(documents: string) {
        this.documents = documents;
    }


    async insert<A>(data: A): Promise<void> {
        try {
            const userCol = collection(db, 'users') as CollectionReference<A>;
            await addDoc(userCol, data);
        } catch (e: unknown) {
            this.catchError(e);
        }
    }

    async countWhere(where: string, params: string | number, operator: WhereFilterOp = "=="): Promise<number> {
        try {
            const userCol = collection(db, 'users');
            const q = query(userCol, fireWhere(where, operator, params));

            const snapshot = await getCountFromServer(q);
            return snapshot.data().count;
        } catch (e: unknown) {
            this.catchError(e);
        }
    }

    async fetchAll<T>(): Promise<T[]> {
        try {
            const userCol = collection(db, this.documents) as CollectionReference<T>;
            const querySnapshot = await getDocs(userCol);
            return querySnapshot.docs.map(doc => {
                return {...doc.data(), id: doc.id};
            });
        } catch (e: unknown) {
            this.catchError(e);
        }
    }

    async count(): Promise<number> {
        try {
            const userCol = collection(db, this.documents);
            const snapshot = await getCountFromServer(userCol);
            return snapshot.data().count;
        } catch (e: unknown) {
            this.catchError(e);
        }
    }

    protected catchError(e: unknown): never {
        let err: Error;
        if (e instanceof Error) {
            err = e;
        } else {
            err = new Error(String(e));
        }
        throw new FirestoreError(err.message, err);
    }
}