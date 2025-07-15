import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookUser, LayoutDashboardIcon, List, PlusSquare, TimerIcon } from 'lucide-react'
import BoardPage from '../pages/boardView'
import TimeLineView from '../pages/timelineView'
import TaskView from '../pages/taskView'
import ListView from '../pages/listView'


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
                    <ListView id={id} />
                </TabsContent>
                <TabsContent value='timeline'>
                    <TimeLineView id={id} />
                </TabsContent>
                <TabsContent value='tasks'>
                    <TaskView/>
                </TabsContent>
            </Tabs>

        </div>
    </div>
  )
}

export default ProjectId