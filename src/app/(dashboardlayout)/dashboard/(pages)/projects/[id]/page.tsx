import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookUser, LayoutDashboardIcon, List, PlusSquare, TimerIcon } from 'lucide-react'
import ListPage from '../pages/list'
import BoardPage from '../pages/board'
import TaskPage from '../pages/task'
import TimeLinePage from '../pages/timeline'

type Props = {
    params: {id: string};
}

const ProjectId = async ({params}: Props) => {

    const { id } = await params;

  return (
    <div className='flex flex-col gap-10 w-full'>
        <div className='flex justify-between'>
            <h1 className='text-4xl font-bold'>Project Tasks</h1>
            <Button><PlusSquare /> New Board</Button>
        </div>

        <div className='flex lg:flex-row flex-col-reverse gap-4 items-start justify-around w-full max-h-screen'>
            <Tabs defaultValue='board' className='w-full'>
                <TabsList>
                    <TabsTrigger value='board'><LayoutDashboardIcon />Borads</TabsTrigger>
                    <TabsTrigger value='list'><List/> List</TabsTrigger>
                    <TabsTrigger value='timeline'><TimerIcon />Timeline</TabsTrigger>
                    <TabsTrigger value='tasks'><BookUser/> Tasks</TabsTrigger>
                </TabsList>
                <TabsContent value='board'>
                    <BoardPage id={id} />
                </TabsContent>
                <TabsContent value='list'>
                    <ListPage />
                </TabsContent>
                <TabsContent value='timeline'>
                    <TimeLinePage />
                </TabsContent>
                <TabsContent value='tasks'>
                    <TaskPage />
                </TabsContent>
            </Tabs>

        </div>
    </div>
  )
}

export default ProjectId