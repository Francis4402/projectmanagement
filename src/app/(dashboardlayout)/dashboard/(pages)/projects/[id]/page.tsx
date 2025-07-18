

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LayoutDashboardIcon, List, Table, TimerIcon } from 'lucide-react'
import BoardPage from '../pages/boardView'
import TimeLineView from '../pages/timelineView'
import TaskView from '../pages/taskView'
import ListView from '../pages/listView'
import React from 'react'


const ProjectId = ({params}: { params: Promise<{ id: string }>}) => {

    const { id } = React.use(params);

  return (
    <div className='flex flex-col gap-10 w-full'>
        

        <div className='flex lg:flex-row flex-col-reverse gap-4 items-start justify-around w-full max-h-screen'>
            <Tabs defaultValue='board' className='w-full'>
                <TabsList>
                    <TabsTrigger value='board'><LayoutDashboardIcon />Borads</TabsTrigger>
                    <TabsTrigger value='list'><List/> List</TabsTrigger>
                    <TabsTrigger value='timeline'><TimerIcon />Timeline</TabsTrigger>
                    <TabsTrigger value='tasks'><Table /> Tasks</TabsTrigger>
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
                    <TaskView id={id}/>
                </TabsContent>
            </Tabs>
        </div>
    </div>
  )
}

export default ProjectId