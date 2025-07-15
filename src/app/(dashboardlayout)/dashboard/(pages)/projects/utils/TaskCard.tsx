import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Task } from '@/types'
import Image from 'next/image'
import { format } from "date-fns";

const TaskCard = ({task}: {task: Task}) => {

  return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle>
                    <p>
                        Title: {task.title}
                    </p>
                </CardTitle>

                {task.attachments && task.attachments.length > 0 && (
                    <div className='flex flex-col gap-2'>
                        <strong>Attachments:</strong>
                        <div className="flex flex-wrap">
                            {task.attachments && task.attachments.length > 0 && (
                            <Image
                                src={
                                (task.attachments && task.attachments[0] && task.attachments[0].fileURL)
                                    ? 'https://res.cloudinary.com/dse9babc4/image/upload/v1748711544/sig46rfevup-1748711542881-images-710zbcjqmll._sl1500__1_1_1.jpg'
                                    : "https://res.cloudinary.com/dse9babc4/image/upload/v1748711544/sig46rfevup-1748711542881-images-710zbcjqmll._sl1500__1_1_1.jpg"
                                }
                                alt="i"
                                width={400}
                                height={400}
                                className="rounded-md"
                            />
                            )}
                        </div>
                    </div>
                )}
            </CardHeader>
            <CardContent>
                <p>
                    <strong>ID:</strong> {task.id}
                </p>
                <p>
                    <strong>Description:</strong>{" "}
                    {task.description || "No description provided"}
                </p>
                <p>
                    <strong>Status:</strong> {task.status}
                </p>
                <p>
                    <strong>Priority:</strong> {task.priority}
                </p>
                <p>
                    <strong>Tags:</strong> {task.tags || "No tags"}
                </p>
                <p>
                    <strong>Start Date:</strong>{" "}
                    {task.startDate ? format(new Date(task.startDate), "P") : "Not set"}
                </p>
                <p>
                    <strong>Due Date:</strong>{" "}
                    {task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}
                </p>
                <p>
                    <strong>Author:</strong>{" "}
                    {task.author ? task.author.username : "Unknown"}
                </p>
                <p>
                    <strong>Assignee:</strong>{" "}
                    {task.assignee ? task.assignee.username : "Unassigned"}
                </p>
            </CardContent>
        </Card>
    </div>
  )
}

export default TaskCard