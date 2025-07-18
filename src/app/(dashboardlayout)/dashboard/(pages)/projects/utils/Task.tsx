/* eslint-disable @typescript-eslint/no-explicit-any */
import { Task } from "@/types"
import { useDrag } from "react-dnd";
import { format } from "date-fns";
import { MessageSquareMore } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TaskProps = {
    task: Task;
}

const Tasks = ({task}: TaskProps) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: task.id },
        collect: (monitor: any) => ({
          isDragging: !!monitor.isDragging(),
        }),
    }));

    // Use tags as array directly
    const taskTagsArray = task.tags || [];

    const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "";
    const formattedDueDate = task.dueDate
        ? format(new Date(task.dueDate), "P")
        : "";

    const numberOfComments = (task.comments && task.comments.length) || 0;

    const PriorityTag = ({ priority }: { priority: Task["priority"] }) => (
        <div
          className={`rounded-full px-2 py-1 text-xs font-semibold ${
            priority === "Urgent"
              ? "bg-red-200 text-red-700"
              : priority === "High"
                ? "bg-yellow-200 text-yellow-700"
                : priority === "Medium"
                  ? "bg-green-200 text-green-700"
                  : priority === "Low"
                    ? "bg-blue-200 text-blue-700"
                    : "bg-gray-200 text-gray-700"
          }`}
        >
          {priority}
        </div>
    );

  return (
    <Card ref={(instance) => {
        drag(instance);
    }} className={`${isDragging ? "opacity-50" : "opacity-100"}`}>
        <CardHeader>
                {task.attachments && task.attachments.length > 0 && (
                    <Image src={`https://res.cloudinary.com/dse9babc4/image/upload/v1748711544/sig46rfevup-1748711542881-images-710zbcjqmll._sl1500__1_1_1.jpg`} alt="i" width={400} height={400}  />
                )}

            <div className="flex flex-1 flex-wrap items-center gap-2">
                {task.priority && <PriorityTag priority={task.priority} />}
            </div>
        </CardHeader>
        <CardContent>
            
            <CardTitle>{task.title} {typeof task.points === "number" && (
                <div className="text-xs font-semibold dark:text-white">
                    {task.points} pts
                </div>
            )}</CardTitle>
            <CardDescription>
                {task.description}
            </CardDescription>
        </CardContent>
        <CardFooter>
            <div className="flex flex-col w-full gap-2">
                <div className="flex flex-1 flex-wrap gap-2">
                    {
                        taskTagsArray.map((tag) => (
                            <div key={tag} className="text-xs">
                                {" "}
                                {tag}
                            </div>
                        ))
                    }
                </div>
                <div>
                    {formattedStartDate && <span>{formattedStartDate} - </span>}
                    {formattedDueDate && <span>{formattedDueDate}</span>}
                </div>

                <div className="mt-4 border-t border-gray-200 dark:border-stroke-dark" />

                <div className="mt-3 flex items-center justify-between">
                    <div className="flex -space-x-[6px] overflow-hidden">
                        {
                            task.assignee && (
                                <Avatar key={`assignee-${task.assignee.userId}`} className="border-2 border-white">
                                    <AvatarImage src={'https://res.cloudinary.com/dse9babc4/image/upload/v1752003057/2025010002I%20am.png'} alt="i" />
                                    <AvatarFallback>A</AvatarFallback>
                                </Avatar>
                            )
                        }
                        {
                            task.author && (
                                <Avatar key={`author-${task.author.userId}`} className="border-2 border-white">
                                    <AvatarImage src={'https://res.cloudinary.com/dse9babc4/image/upload/v1745576207/kxkwsm1md2-1745576201782-images-482024512_1261641075964882_3565966937447068422_n.jpg'} alt="i" />
                                    <AvatarFallback>A</AvatarFallback>
                                </Avatar>
                            )
                        }
                    </div>

                    <div className="flex items-center text-gray-500 dark:text-neutral-500">
                        <MessageSquareMore size={20} />
                        <span className="ml-1 text-sm dark:text-neutral-400">
                        {numberOfComments}
                        </span>
                    </div>
                </div>
            </div>

            
        </CardFooter>
    </Card>
  )
}

export default Tasks