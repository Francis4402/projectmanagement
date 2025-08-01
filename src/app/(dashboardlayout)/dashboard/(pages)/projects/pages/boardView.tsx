"use client";

import { useGetTasksQuery, useUpdateTaskStatusMutation } from "@/redux/features/reduxapi/task";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumnsProps from "../utils/TaskColumnsProps";
import NewTaskForm from "../utils/NewTaskForm";


const BoardPage = ({id}: {id: string}) => {

  const {data: tasks, refetch} = useGetTasksQuery({projectId: Number(id)});
  const [updateTaskStatus] = useUpdateTaskStatusMutation();


  const taskStatus = ["To-Do", "Work-In-Progress", "Under-Review", "Completed"];

  const moveTask = async (taskId: number, toStatus: string) => {
    try {
      await updateTaskStatus({taskId, status: toStatus}).unwrap();
      
      refetch();
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  }

  return (
    <div className="mt-10 flex flex-col gap-5">

      <div className="flex justify-end">
        <NewTaskForm refetchTasks={refetch} />
      </div>

      <DndProvider backend={HTML5Backend}>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
          {
            taskStatus.map((status) => (
              <TaskColumnsProps key={status} status={status} tasks={tasks || []} moveTask={moveTask} />
            ))
          }
        </div>
      </DndProvider>
    </div>
  )
}

export default BoardPage