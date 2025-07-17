import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '../utils/app-sidebar'
import SiteHeader from '../utils/site-header'



const DasboardLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
        <SiteHeader />
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DasboardLayout