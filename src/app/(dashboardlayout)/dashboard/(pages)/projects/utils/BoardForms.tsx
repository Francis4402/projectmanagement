"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ChevronDownIcon, PlusSquare } from 'lucide-react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateBoardSchema } from '@/app/(dashboardlayout)/schema/CreateBoardSchema'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { formatISO } from 'date-fns'
import { Textarea } from '@/components/ui/textarea'
import { useCreateProjectMutation, useGetProjectsQuery } from '@/redux/features/reduxapi/project'
import { toast } from 'sonner'


const BoardForms = () => {

    const [createProject] = useCreateProjectMutation();
    const {refetch} = useGetProjectsQuery();

    const form = useForm({
        resolver: zodResolver(CreateBoardSchema),
    })

    const {formState: {isSubmitting}} = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const res = await createProject(data).unwrap();
            if (res) {
                toast.success("Project created successfully!");
                await refetch();
            } else {
                toast.error("Failed to create project");
            }
            form.reset();
        } catch (error) {
            
            console.log(error);
        }
    }


  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button><PlusSquare/> New Boards</Button>
        </DialogTrigger>
        <DialogContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                        <DialogHeader>
                            <DialogTitle>Create New Project</DialogTitle>
                        </DialogHeader>

                        <FormField control={form.control} name='name' render={({field}) => (
                            <FormItem>
                                <FormLabel>Project Name</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} value={field.value || ''} placeholder='Enter Project Name' />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} />

                        <FormField control={form.control} name='description' render={({field}) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} value={field.value || ''} placeholder='Enter Description' />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} />

                        <div className='grid grid-cols-2 gap-4'>
                            <FormField control={form.control} name='startDate' render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Start Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                id="date"
                                                className="justify-between font-normal w-full"
                                            >
                                                { field.value ? new Date(field.value).toLocaleDateString() : "Select StartDate"}
                                                <ChevronDownIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <Calendar
                                                mode="single"
                                                selected={field.value ? new Date(field.value) : undefined}
                                                captionLayout="dropdown"
                                                onSelect={(date) => field.onChange(date ? formatISO(date) : undefined)}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name='endDate' render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">End Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                id="date"
                                                className="justify-between font-normal w-full"
                                            >
                                                { field.value ? new Date(field.value).toLocaleDateString() : "Select EndDate"}
                                                <ChevronDownIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <Calendar
                                                mode="single"
                                                selected={field.value ? new Date(field.value) : undefined}
                                                captionLayout="dropdown"
                                                onSelect={(date) => field.onChange(date ? formatISO(date) : undefined)}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>


                        <DialogFooter>
                            <Button type='submit'>
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </Button>
                        </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  )
}

export default BoardForms