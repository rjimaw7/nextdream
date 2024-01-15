import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 p-24">
      <h1>Dreams landing page</h1>
      <Link href="./dreams" className="border p-5 rounded-md">
        Go to Dreams Table List
      </Link>
      <Link href="./dreams/add-dream" className="border p-5 rounded-md">
        Add a Dream
      </Link>
    </main>
  );
}
