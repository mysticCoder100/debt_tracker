import {FirebaseModel} from "@/models/FirebaseModel";
import {db} from "@/lib/firbase";
import {collection, CollectionReference, getDocs, query, where} from "firebase/firestore";

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
}