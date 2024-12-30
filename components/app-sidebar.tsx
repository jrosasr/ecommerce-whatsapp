import * as React from "react"
import { Gem } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { auth } from "@/auth"
import Link from "next/link"

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }

  console.log('sess', session.user);
  
  
  return (
    <Sidebar {...props} className="bg-slate-950" >
      <SidebarHeader className="border-sidebar-border bg-slate-950 border-b border-b-slate-700 h-16">
        {session.user ? (
          <NavUser user={
            {
              name: session.user.name!,
              email: session.user.email!,
              image: session.user.image,
              role: session.user.role
            }
          } />
        ) : null}
      </SidebarHeader>
      <SidebarContent className="bg-slate-950">
        <SidebarSeparator className="mx-0" />
        <div className="flex items-center gap-2 px-3 py-2 font-semibold text-sm">
          <Link href="/dashboard" className="flex items-center gap-2">
          <Gem className="w-4 h-4" />
            Códigos
          </Link>
        </div>
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
