"use server"

import {formStatusType} from "@/type/FormStatus";
import {AddFirebaseUserType, FirestoreUserType, UserSchema} from "@/type/UserType";
import {User} from "@/models/User";
import {revalidatePath} from "next/cache";
import {ApplicationError} from "@/error/ApplicationError";
import {NewUser} from "@/models/NewUser";


export async function addCustomer(formStatus: formStatusType, formData: FormData): Promise<formStatusType> {

    const validatedFields = UserSchema.safeParse({
            ...Object.fromEntries(formData.entries()),
        }
    );

    if (!validatedFields.success) {
        return {
            status: "failed",
            message: "validation error",
            data: validatedFields.error.flatten().fieldErrors,
            formData
        };
    }


    const {name, phonenumber} = validatedFields.data;

    try {

        const nameExists = await (new NewUser()).countWhere("name", name);
        const phonenumberExists = await (new NewUser()).countWhere("phonenumber", phonenumber);

        const errors: {
            name: string | null,
            phonenumber: string | null
        } = {
            name: null,
            phonenumber: null
        };

        if (nameExists > 0) {
            errors.name = "This name already exists.";
        }

        if (phonenumberExists > 0) {
            errors.phonenumber = "This phone number already exists.";
        }

        if (errors.name || errors.phonenumber) {
            return {
                status: "failed",
                message: "Validation error.",
                data: errors,
                formData
            };
        }

        const data: AddFirebaseUserType = {
            ...validatedFields.data,
            balance: 0
        };

        const user = await (new NewUser()).insert<AddFirebaseUserType>(data);

        revalidatePath("/dashboard/customers");
        return {
            status: "success",
            message: "Customer Added Successfully",
        }

    } catch (e: unknown) {
        return {
            status: "failed",
            message: "Server Error"
        };
    }

}