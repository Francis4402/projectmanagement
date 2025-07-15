"use client"

import React, { useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetTasksQuery } from "@/redux/features/reduxapi/task";
import { ScrollArea } from "@/components/ui/scroll-area";



type Timeline = "day" | "week" | "month";

const TimelineView = ({ id }: {id: string}) => {
  const { data: tasks } = useGetTasksQuery({ projectId: Number(id) });

  const [viewMode, setViewMode] = useState<Timeline>("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  const formattedTasks = useMemo(() => {
    return tasks?.map(task => ({
      ...task,
      startDate: new Date(task.startDate as string),
      dueDate: new Date(task.dueDate as string),
      progress: task.points ? (task.points / 10) * 100 : 0,
    })) || [];
  }, [tasks]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const renderTimeline = () => {
    switch (viewMode) {
      case "month":
        return renderMonthView();
      case "week":
        return renderWeekView();
      case "day":
        return renderDayView();
      default:
        return renderMonthView();
    }
  };

  const renderMonthView = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">
            {monthStart.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => {
              setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
            }}>
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => {
              setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
            }}>
              Next
            </Button>
          </div>
        </div>
        
        <ScrollArea className="h-[400px]">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-medium text-sm py-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              const dayTasks = formattedTasks.filter(task => 
                task.startDate <= date && task.dueDate >= date
              );
              
              return (
                <div 
                  key={day} 
                  className={`min-h-24 p-1 border rounded-md ${
                    date.getDay() === 0 || date.getDay() === 6 ? 'bg-muted/50' : ''
                  }`}
                >
                  <div className="text-right text-sm mb-1">{day}</div>
                  <div className="space-y-1">
                    {dayTasks.slice(0, 2).map(task => (
                      <div 
                        key={task.id} 
                        className="text-xs p-1 rounded bg-primary text-primary-foreground truncate"
                        title={task.title}
                      >
                        {task.title}
                      </div>
                    ))}
                    {dayTasks.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{dayTasks.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <div className="mt-4 p-3 bg-muted/30 rounded-md">
          <p className="text-sm">
            <span className="font-medium">Month Summary:</span> {formattedTasks.filter(task => 
              task.startDate <= monthEnd && task.dueDate >= monthStart
            ).length} tasks between {monthStart.toLocaleDateString()} and {monthEnd.toLocaleDateString()}
          </p>
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    // Similar implementation for week view
    return <div>Week view implementation</div>;
  };

  const renderDayView = () => {
    // Similar implementation for day view
    return <div>Day view implementation</div>;
  };

  return (
    <div className="px-4 xl:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4 py-5">
        
        <Select 
          value={viewMode} 
          onValueChange={(value) => setViewMode(value as Timeline)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select view mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Day</SelectItem>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <div className="p-4">
          {renderTimeline()}
          <div className="pt-4">
            <Button>
              Add New Task
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TimelineView;