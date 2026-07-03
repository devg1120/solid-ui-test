import { IconPlaceholder } from "~/components/icon-placeholder"
import { Card } from "~/registry/ui/card"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator
} from "~/registry/ui/sidebar"

export function SidebarNav() {
  return (
    <div class="grid grid-cols-2 items-start gap-6">
      <Card class="overflow-hidden py-0">
        <SidebarProvider class="min-h-0">
          <Sidebar collapsible="none" class="w-full bg-transparent">
            <SidebarContent class="gap-0">
              <SidebarGroup class="pb-1">
                <SidebarGroupLabel>Overview</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive>
                        <IconPlaceholder
                          lucide="LayoutDashboardIcon"
                          tabler="IconLayoutDashboard"
                        />
                        Dashboard
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <IconPlaceholder lucide="ArrowLeftRightIcon" tabler="IconArrowsLeftRight" />
                        Transactions
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <IconPlaceholder lucide="TrendingUpIcon" tabler="IconTrendingUp" />
                        Investments
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarSeparator class="w-auto!" />
              <SidebarGroup class="pt-1">
                <SidebarGroupLabel>Planning</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <IconPlaceholder lucide="TargetIcon" tabler="IconTarget" />
                        Goals
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <IconPlaceholder lucide="WalletIcon" tabler="IconWallet" />
                        Budget
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <IconPlaceholder lucide="FileBarChartIcon" tabler="IconReportAnalytics" />
                        Reports
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <IconPlaceholder lucide="FileTextIcon" tabler="IconFileText" />
                        Documents
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      </Card>
      <Card class="overflow-hidden py-0">
        <SidebarProvider class="min-h-0">
          <Sidebar collapsible="none" class="w-full bg-transparent">
            <SidebarContent class="gap-0">
              <SidebarGroup class="pb-1">
                <SidebarGroupLabel>Account</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <IconPlaceholder lucide="UserIcon" tabler="IconUser" />
                        Profile
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive>
                        <IconPlaceholder lucide="CreditCardIcon" tabler="IconCreditCard" />
                        Billing
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <IconPlaceholder lucide="BellIcon" tabler="IconBell" />
                        Notifications
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <IconPlaceholder lucide="ShieldIcon" tabler="IconShield" />
                        Security
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarSeparator class="w-auto!" />
              <SidebarGroup class="pt-1">
                <SidebarGroupLabel>Support</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <IconPlaceholder lucide="CircleHelpIcon" tabler="IconHelp" />
                        Help Center
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <IconPlaceholder lucide="MessageSquareIcon" tabler="IconMessage" />
                        Contact Us
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <IconPlaceholder lucide="ActivityIcon" tabler="IconActivity" />
                        Status
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      </Card>
    </div>
  )
}
