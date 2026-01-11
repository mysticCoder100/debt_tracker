"use server"

import {User} from "@/models/User";
import {revalidatePath} from "next/cache";

export async function deleteUser(userId: number): Promise<void | boolean> {
    const deletedUser = await (new User()).deleteUser(userId)
    revalidatePath("/dashboard/customers");
    return deletedUser;
}