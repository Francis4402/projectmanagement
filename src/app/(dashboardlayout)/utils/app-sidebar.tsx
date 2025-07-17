"use client"

import * as React from "react"
import {
  AudioWaveform,
  Briefcase,
  Command,
  GalleryVerticalEnd,
  Home,
  Projector,
  Proportions,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TeamSwitcher } from "./team-switcher"
import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"


// This is sample data.
const data = {
  
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    
    {
      title: "Projects",
      url: "#",
      icon: Projector,
      isActive: true,
      items: [
        {
          title: "All-Projects",
          url: "/dashboard/projects",
        }
      ],
    },
    {
      title: "Priority",
      url: "#",
      icon: Proportions,
      items: [
      ],
    },
  ],
  layouts: [
    {
      name: "Home",
      url: "/",
      icon: Home,
    },
    {
      name: "Timeline",
      url: "#",
      icon: Briefcase,
    },
    {
      name: "Search",
      url: "#",
      icon: Search,
    },
    {
      name: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      name: "Users",
      url: "#",
      icon: User,
    },
    {
      name: "Teams",
      url: "#",
      icon: Users,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  


  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.layouts} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
