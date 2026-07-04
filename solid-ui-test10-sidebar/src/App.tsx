import { AppSidebar } from "./app-sidebar"
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
//import "./App.css"
import "./app.css"

export default function Layout(props: ParentProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
	   {props.children}
      </main>
    </SidebarProvider>
  )
}
