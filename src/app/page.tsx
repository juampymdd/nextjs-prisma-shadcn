import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createPrismaClient } from "@/lib/prisma";
import clsx from "clsx";
import { TaskButtonDelete } from "./new/task-button-delete";

export default async function Home() {

  const prisma = createPrismaClient();
  const tasks = await prisma.task.findMany();
  console.log("Tasks", tasks);
  return (
    <div className="container mx-auto">
      <h1>
        List of Tasks
      </h1>
      <div className="grid md:grid-cols-3 justify-center gap-4">
        {
          tasks.map((task) => (
            <Card key={task.id} className="lg:w-[350px]">
              <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{task.name}</CardTitle>
              <Badge className={clsx({
                'bg-green-500': task.priority === 'low',
                'bg-yellow-500': task.priority === 'medium',
                'bg-orange-500': task.priority === 'high',
                'bg-red-500': task.priority === 'urgent',

              })}>{task.priority}</Badge>
              </CardHeader>
              <CardContent className="flex flex-col gap-1"> 
                <CardDescription className="flex flex-col">
                  <span className="font-semibold">Description:</span>
                  {task.description}
                </CardDescription>
                <div className="text-xs text-muted-foreground flex justify-between"><span className="font-bold">Created At:</span> <span>{new Date(task.createdAt).toLocaleString()}</span></div>
              </CardContent>
              
               <CardFooter className="flex justify-end gap-2">
                  <Button>Update</Button>
                  <TaskButtonDelete task={task}/>
               </CardFooter>
            </Card>
          ))
        }
      </div>
    </div>


  );
}
