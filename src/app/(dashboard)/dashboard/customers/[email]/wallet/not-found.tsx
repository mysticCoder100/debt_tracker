import Link from 'next/link'
import {Button} from "@/components/ui/button";
import {FrownIcon} from "lucide-react";

export default function NotFound() {
    return (
        <main className={"grid place-content-center justify-items-center gap-3 h-full"}>
            <FrownIcon/>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Button asChild>
                <Link href="/dashboard/customers">Return to list</Link>
            </Button>
        </main>
    )
}