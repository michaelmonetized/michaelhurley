import { Button } from "@/components/ui/button";
import { headers } from "next/headers";
import Link from "@/components/link";

export default async function NotFound() {
  const headersList = await headers();
  const referer = headersList.get("referer");
  const domain = headersList.get("host");

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Not Found {domain}</h1>
      <p className="text-lg">The page you are looking for does not exist.</p>
      {referer && (
        <Button asChild>
          <Link href={referer}>Go back</Link>
        </Button>
      )}
    </div>
  );
}
