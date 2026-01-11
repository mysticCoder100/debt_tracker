"use client"

import {AppSidebar} from "@/components/AppSidebar";
import {SidebarProvider} from "@/components/ui/sidebar";
import React from "react";
import {useIsMobile} from "@/hooks/use-mobile";

export function SidebarWrapper({children}: {
    children: React.ReactNode;
}) {

    const [open, setOpen] = React.useState(true);
    const isMobile = useIsMobile();


    return (
        <SidebarProvider defaultOpen={open}>
            <AppSidebar onClickAction={() => isMobile && setOpen(false)}/>
            {children}
        </SidebarProvider>
    );
}