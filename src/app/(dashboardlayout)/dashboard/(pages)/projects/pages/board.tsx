"use client";

import { useGetTasksQuery } from "@/redux/features/reduxapi/task";



const BoardPage = ({id}: {id: string}) => {

  const {data: tasks} = useGetTasksQuery({projectId: Number(id)});

  console.log(tasks)

  return (
    <div>
      <p>Project ID: {id}</p>
    </div>
  )
}

export default BoardPage