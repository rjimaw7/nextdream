"use server";

import { sql } from "@vercel/postgres";
import { SubmitHandler } from "react-hook-form";
import { revalidatePath } from "next/cache";
import { getCurrentTimeStamp } from "./utils";
import { redirect } from "next/navigation";

interface Props {
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
