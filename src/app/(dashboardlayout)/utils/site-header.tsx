"use client"

import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import Searchbar from './search-bar'
import { ModeToggle } from '@/app/utils/darkmode/mode-toggle'
import { LogOut, Settings } from 'lucide-react'
import { useUser } from '@/app/context/UserContext'
import { logout } from '@/app/services/AuthService'
import { publicRoutes } from '../../../../route'
import { usePathname, useRouter } from 'next/navigation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const SiteHeader = () => {

  const {setIsLoading} = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();

    if (publicRoutes.some(route => pathname.match(route))) {
      router.push("/");
    }
  }

  return (
    <header className="flex h-16 shrink-0 mb-10 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
            <SidebarTrigger className="-ml-1"/>

            <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Searchbar />

            <div className="ml-auto flex items-center gap-5">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Settings className='w-6 h-6 cursor-pointer' />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut/>
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <ModeToggle />
                
            </div>
        </div>
    </header>
  )
}

export default SiteHeader