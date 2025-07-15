"use client"

import { Button } from '@/components/ui/button';
import { useGetTasksQuery } from '@/redux/features/reduxapi/task'
import { Task } from '@/types';
import TaskCard from '../utils/TaskCard';

const ListView = ({id}: {id: string}) => {

    const {data: tasks} = useGetTasksQuery({projectId: Number(id)});

    

  return (
    <div className='px-4 pb-8 xl:px-6'>
      <div className='py-5'>
        <Button>
          Add Task
        </Button>
      </div>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-5'>
        {
          tasks?.map((task: Task) => <TaskCard key={task.id} task={task} />)
        }
      </div>
    </div>
  )
}

export default ListView