import {Header} from "@/components/Header";
import {SidebarWrapper} from "@/components/SidebarProvider";

export default function DashboardLayout({children}: {
    children: React.ReactNode,
}) {

    return (
        <SidebarWrapper>
            <div className="grid min-h-dvh dash-wrapper">
                <Header/>
                <main>
                    {children}
                </main>
                <footer className="text-center p-2">
                    <p className="text-gray-500">&copy; KAAM development team</p>
                </footer>
            </div>
        </SidebarWrapper>
    )
}
