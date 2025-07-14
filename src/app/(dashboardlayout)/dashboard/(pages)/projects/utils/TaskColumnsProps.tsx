/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Task } from "@/types";
import { useDrop } from "react-dnd";
import DialogCard from "./Dialog";
import Tasks from "./Task";

type TaskColumnProps = {
    status: string;
    tasks: Task[];
    moveTask: (taskId: number, toStatus: string) => void;
  };
  

const TaskColumnsProps = ({status, tasks, moveTask}: TaskColumnProps) => {


    const [{isOver}, drop] = useDrop(() => ({
        accept: "task",
        drop: (item: {id:number}) => moveTask(item.id, status),
        collect: (monitor: any) => ({
            isOver: !!monitor.isOver(),
        })
    }));

    const tasksCount = tasks.filter((task) => task.status === status).length;



  return (
    <Card ref={(instance) => {drop(instance)}} className={`${isOver ? "opacity-50" : "opacity-100"}`}>
        <CardHeader>
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                        {status}{" "}
                    <span
                        className="ml-2 inline-block rounded-full dark:bg-gray-600 bg-gray-300 p-1 text-center text-sm leading-none"
                        style={{ width: "1.5rem", height: "1.5rem" }}
                        >
                        {tasksCount}
                    </span>
                </div>

                <DialogCard />
            </div>
        </CardHeader>

        <CardContent>
            <div className="flex flex-col gap-5">
                {tasks
                    .filter((task) => task.status === status)
                    .map((task) => (
                    <Tasks key={task.id} task={task} />
                ))}
            </div>
        </CardContent>
    </Card>
  )
}

export default TaskColumnsProps