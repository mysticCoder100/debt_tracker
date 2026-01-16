import z from "zod";

export type UserType = {
    id: number;
    name: string;
    phonenumber: string;
}


export type UserWithWalletType = UserType & {
    balance: number;
}

export type FirestoreUserType = {
    id: string | number;
    name: string;
    phonenumber: string;
    balance: number;
};

export type AddFirebaseUserType = Omit<FirestoreUserType, "id">;

export const UserSchema = z.object({
    name: z.string().nonempty("Name is required"),
    phonenumber: z.string().min(11, "Phone number must be a minimum of 11 characters"),
})