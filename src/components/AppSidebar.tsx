"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent, SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {ArrowLeftRight, Gauge, User} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";


const items = [
    {
        title: "Dashboard",
        url: "",
        icon: Gauge,
    },
    {
        title: "Customers",
        url: "/customers",
        icon: User,
    },
    {
        title: "Add Transaction",
        url: "/add-transaction",
        icon: ArrowLeftRight,
    },
];

export function AppSidebar({onClickAction}: {
    onClickAction: () => void;
}) {

    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex gap-2 p-2 items-center shadow-lg">
                    <h2>Logo</h2>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="gap-4">
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item, index) => {
                                const url = `/dashboard${item.url}`;
                                const isActive = url === pathname;

                                return (
                                    <SidebarMenuItem key={index}>
                                        <SidebarMenuButton size={"lg"} asChild isActive={isActive}>
                                            <Link href={url} onClick={onClickAction}>
                                                <item.icon/>
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
