import { AppSidebar } from "./app-sidebar"
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import "./App.css"
//import "./sidebar.css"

export default function Layout(props: ParentProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  )
}
