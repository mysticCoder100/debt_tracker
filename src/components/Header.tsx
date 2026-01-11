import {SidebarTrigger} from "@/components/ui/sidebar";

export function Header() {
    return (
        <header className="flex gap-2 p-2 md:p-4 items-center shadow-lg sticky bg-white top-0 z-[49]">
            <SidebarTrigger className="md:hidden"/>
            <div className="flex items-center justify-between w-full">
                <h3>
                    Debit Tracker
                </h3>
                <div className="border-2 border-grey-400 w-8 aspect-square rounded-full">
                   <span className="m-auto">
                        KM
                   </span>
                </div>
            </div>
        </header>
    );
}
