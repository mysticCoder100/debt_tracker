"use server"

import {formStatusType} from "@/type/FormStatus";
import {UserSchema} from "@/type/UserType";
import {User} from "@/models/User";
import {revalidatePath} from "next/cache";


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

        const nameExists = await (new User()).countWhere<{ total: number }>("name", name);
        const phonenumberExists = await (new User()).countWhere<{ total: number }>("phonenumber", phonenumber);

        if (!nameExists || !phonenumberExists) {
            throw new Error("Validation error: Unable to verify name or phone number existence.");
        }

        const errors: {
            name: string | null,
            phonenumber: string | null
        } = {
            name: null,
            phonenumber: null
        };

        if (nameExists && nameExists.total > 0) {
            errors.name = "This name already exists.";
        }

        if (phonenumberExists && phonenumberExists.total > 0) {
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


        const user = await (new User()).insert(
            [name, phonenumber],
            ["name", "phonenumber"]
        );

        if (user) {
            revalidatePath("/dashboard/customers");
            return {
                status: "success",
                message: "Customer Added Successfully",
            }
        }

        throw new Error("validation error");

    } catch (e) {
        return {
            status: "failed",
            message: "server error"
        };
    }

}