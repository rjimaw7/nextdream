"use server";

import { sql } from "@vercel/postgres";
import { SubmitHandler } from "react-hook-form";
import { revalidatePath } from "next/cache";
import { getCurrentTimeStamp } from "./utils";
import { redirect } from "next/navigation";

interface Props {
  id?: string;
  title: string;
  date: Date;
  dream: string;
}

export const handleSubmitDream: SubmitHandler<Props> = async ({
  date,
  dream,
  title,
}) => {
  await sql`
INSERT INTO dreams (title,date,dream)
VALUES (${title}, ${getCurrentTimeStamp(date)}, ${dream})
`;

  console.log("add dream success");

  revalidatePath("/dreams");
  redirect("/dreams");
};

export const handleEditDream: SubmitHandler<Props> = async ({
  id,
  date,
  dream,
  title,
}) => {
  await sql`
UPDATE dreams SET id= ${id}, title= ${title}, date= ${date.toISOString()}, dream= ${dream} WHERE id = ${id}
`;

  console.log("edit dream success");

  revalidatePath("/dreams");
  revalidatePath(`/dreams/${id}/edit`);
  redirect("/dreams");
};

export const deleteDream = async (id: string) => {
  await sql`DELETE FROM dreams WHERE id = ${id}`;

  console.log("Dream Deleted");

  revalidatePath("/dreams");
};
