"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ChevronDownIcon, PlusSquare } from 'lucide-react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { formatISO } from 'date-fns'
import { createTaskSchema } from '@/app/(dashboardlayout)/schema/CreateTaskSchema'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useState, KeyboardEvent, ChangeEvent } from 'react'
import { Badge } from '@/components/ui/badge'


const NewTaskForm = () => {
    
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const form = useForm({
        resolver: zodResolver(createTaskSchema)
    });
    const {formState: {isSubmitting}} = form;

    const handleTagInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTagInput(e.target.value);
    };

    const handleTagInputKeyDown = (e: KeyboardEvent<HTMLInputElement>, onChange: (value: string[]) => void) => {
        if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                const newTags = [...tags, tagInput.trim()];
                setTags(newTags);
                onChange(newTags);
            }
            setTagInput("");
        }
    };

    const handleRemoveTag = (removeIndex: number, onChange: (value: string[]) => void) => {
        const newTags = tags.filter((_, idx) => idx !== removeIndex);
        setTags(newTags);
        onChange(newTags);
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log({ ...data, tags });
        setTags([]);
        form.reset();
    }


  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button><PlusSquare/> Add New Task</Button>
        </DialogTrigger>
        <DialogContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                        <DialogHeader>
                            <DialogTitle>Create New Project</DialogTitle>
                        </DialogHeader>

                        <FormField control={form.control} name='title' render={({field}) => (
                            <FormItem>
                                <FormLabel>Task Title</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} value={field.value || ''} placeholder='Enter Task Title' />
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

                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <div
                                            className="flex flex-wrap items-center gap-2 border rounded-md px-3 py-2 min-h-[40px] focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                                        >
                                            {tags.map((tag: string, index: number) => (
                                                <Badge variant="secondary" key={index} className="px-3 py-1 flex items-center gap-1">
                                                    {tag}
                                                    <button
                                                        type="button"
                                                        className="ml-1 text-xs"
                                                        onClick={() => handleRemoveTag(index, field.onChange)}
                                                        aria-label={`Remove tag ${tag}`}
                                                    >
                                                        ×
                                                    </button>
                                                </Badge>
                                            ))}
                                            <input
                                                type="text"
                                                className="flex-1 bg-transparent outline-none min-w-[100px]"
                                                placeholder=""
                                                value={tagInput}
                                                onChange={handleTagInputChange}
                                                onKeyDown={(e) => handleTagInputKeyDown(e, field.onChange)}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='grid grid-cols-2 gap-4'>
                            <FormField control={form.control} name='status' render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Status</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value || ''}>
                                        <FormControl>
                                            <SelectTrigger className="h-10 w-full">
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value='To Do'>To Do</SelectItem>
                                                <SelectItem value="Work In Progress">Work In Progress</SelectItem>
                                                <SelectItem value="Under Review">Under Review</SelectItem>
                                                <SelectItem value='Completed'>Completed</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name='priority' render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Priority</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value || ''}>
                                        <FormControl>
                                            <SelectTrigger className="h-10 w-full">
                                                <SelectValue placeholder="Select Priority" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value='Urgent'>Urgent</SelectItem>
                                                <SelectItem value="High">High</SelectItem>
                                                <SelectItem value="Medium">Medium</SelectItem>
                                                <SelectItem value='Low'>Low</SelectItem>
                                                <SelectItem value='BackLog'>BackLog</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>

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

                            

                            <FormField control={form.control} name='dueDate' render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Due Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                id="date"
                                                className="justify-between font-normal w-full"
                                            >
                                                { field.value ? new Date(field.value).toLocaleDateString() : "Select DueDate"}
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

                        <FormField control={form.control} name='points' render={({field}) => (
                            <FormItem>
                                <FormLabel>Points</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} value={field.value || ''} placeholder='Enter Points' />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} />

                        <FormField control={form.control} name='authorUserId' render={({field}) => (
                            <FormItem>
                                <FormLabel>Author Id</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} value={field.value || ''} placeholder='Enter Author Id' />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} />

                        <FormField control={form.control} name='assignedUserId' render={({field}) => (
                            <FormItem>
                                <FormLabel>Assigned Id</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} value={field.value || ''} placeholder='Enter Assigned Id' />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} />

                        <FormField control={form.control} name='projectId' render={({field}) => (
                            <FormItem>
                                <FormLabel>Project Id</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} value={field.value || ''} placeholder='Enter Project Id' />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} />

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

export default NewTaskForm