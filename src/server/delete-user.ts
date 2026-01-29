"use server"

import {revalidatePath} from "next/cache";
import {NewUser} from "@/models/NewUser";

export async function deleteUser(userId: string): Promise<void> {
    const deletedUser = await (new NewUser()).deleteUser(userId)
    revalidatePath("/dashboard/customers");
}