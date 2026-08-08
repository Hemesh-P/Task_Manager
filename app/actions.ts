"use server";

import {
  createTask,
  updateTask,
  archiveTask,
} from "@/lib/tasks";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addTask(formData: FormData) {
  createTask({
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    due_date: formData.get("due_date") as string,
    topic: formData.get("topic") as string,
  });

  revalidatePath("/");
}

export async function editTask(formData: FormData) {
  updateTask(
    Number(formData.get("id")),
    {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      due_date: formData.get("due_date") as string,
      topic: formData.get("topic") as string,
      status: formData.get("status") as
        "todo" | "in_progress" | "complete",
    }
  );

  revalidatePath("/");
  redirect("/");
}

export async function archiveTaskAction(formData: FormData) {
  archiveTask(Number(formData.get("id")));

  revalidatePath("/");
}