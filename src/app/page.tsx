import {Button} from "@/components/ui/button";
import { ChevronRight } from "lucide-react"
import Link from "next/link";

export default function Home() {
  return (
          <div className="self-center p-4 lg:p-0 mx-auto w-dvw max-w-[60rem] text-center text-gray-600">
              <h1> Welcome to KAAM Multipurpose Debt Tracker </h1>
              <Button className="mt-28" asChild>
              <Link href="/dashboard">
                  Get Started <ChevronRight />
              </Link>
              </Button>
          </div>
  );
}
