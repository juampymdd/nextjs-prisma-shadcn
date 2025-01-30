import { Button } from "@/components/ui/button"
import { Task } from "@prisma/client";
import { removeTask } from "../actions/task-actions";

export const TaskButtonDelete = ({task}:{task: Task}) => {

  return (
    <form action={removeTask}>
      <input type="hidden" name="id" value={task.id} />
      <Button variant="destructive" >Delete</Button>
    </form>
  )
}
