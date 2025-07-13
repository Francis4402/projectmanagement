"use client";

import { useGetTasksQuery } from "@/redux/features/reduxapi/task";



const BoardPage = ({id}: {id: number}) => {

  const {data: tasks} = useGetTasksQuery({projectId: id});

  console.log(tasks)

  return (
    <div>
      <p>Project ID: {id}</p>
    </div>
  )
}

export default BoardPage