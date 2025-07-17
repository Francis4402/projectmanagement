"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetProjectsQuery } from "@/redux/features/reduxapi/project"
import { Project } from "@/types";
import { useRouter } from "next/navigation";
import BoardForms from "./utils/BoardForms";

const Projects = () => {

    const router = useRouter();
    const {data: project} = useGetProjectsQuery();

    const handleOnClick = (projectId: number) => {
        router.push(`/dashboard/projects/${projectId}`);
    }
    
  return (
    <div className="flex flex-col gap-10">
        <div className='flex justify-between'>
            <h1 className='text-4xl font-bold'>Projects </h1>
            <BoardForms />
        </div>
        {
            Array.isArray(project) && project.length > 0 ? 
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
                    {
                        project.map((project: Project) => {
                            return (
                                <Card key={project.id} onClick={() => handleOnClick(project.id)} className="cursor-pointer">
                                    <CardHeader>
                                        <CardTitle>{project.name}</CardTitle>
                                    </CardHeader>
        
                                    <CardContent>
                                        <p>{project.description}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <div>
                                            {project.startDate} - {project.endDate}
                                        </div>
                                    </CardFooter>
                                </Card>
                            )
                        })
                    }
                </div>
            : <div className="flex flex-col text-xl items-center justify-center h-screen">There is no Project</div>
        }
    </div>
  )
}

export default Projects