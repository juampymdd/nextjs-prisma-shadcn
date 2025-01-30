"use server"

import { createPrismaClient } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = createPrismaClient();

export async function removeTask(formData: FormData) {

    const id = formData.get("id");
    console.log("Remove Task", {
      id
    });

    await prisma.task.delete({
      where: {
        id: Number(id)
      }
    });

    revalidatePath("/");
  }

  export async function  createTask(formData: FormData) {
    "use server"
    const prisma = createPrismaClient();

    const name = formData.get("name");
    const description = formData.get("description");
    const priority = formData.get("priority");
    console.log("Create Task", {
        name,
        description,
        priority
    });

    const newTask = await prisma.task.create({
        data: {
            name: name as string,
            description: description as string,
            priority: priority as string
        }
    });

    console.log("New Task", newTask);

    redirect("/");
}
