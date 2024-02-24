import { useState } from "react";
import Deleteicon from "../icons/Deleteicon";
import { Id, Task } from "../types";
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

interface Props {
    task: Task;
    deleteTask: (id:Id) => void;
    updateTask: (id:Id, content: string) => void;
}

function TaskCard({ task, deleteTask, updateTask }: Props ){

    const[mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
        id: task.id,
        data: {
            type: 'Task',
            task,
        },
        disabled: editMode,
    });

      {/* Allows tasks to swtich between columns */}
      const style = {
        transition,
        transform: CSS.Transform.toString(transform),

    };

    {/* To add the style effect when we drag the column */}
    if (isDragging) {
        return (
        <div 
        ref = {setNodeRef}
        style={style}
        className="
        opacity-30
        border-2
        border-rose-500
        bg-mainBackgroundColour
        h-[50px]
        rounded-xl
        items-center
        p-2.5
        min-h-[50px]
        text-left
        cursor-grab
        relative
        "> 
            
            
        </div>
        );
    }

  

    const toggleEditMode = () => {
        setEditMode((prev) => !prev);
        setMouseIsOver(false);
    }

    if(editMode) {
        return (
            <div 
                ref = {setNodeRef}
                style = {style}
                {...attributes}
                {...listeners}
                className="
                bg-mainBackgroundColour
                p-2.5
                h-[50px]
                min-h-[50px]
                items-center
                flex
                text-left
                rounded-xl
                hover:ring-2
                hover:ring-insert
                hover:ring-rose-500
                cursor-grab
                relative"
            >
                
                <textarea 
                    className="
                    h-[90%]
                    w-full
                    resize-none
                    border-none
                    rounded
                    bg-transparent
                    text-white
                    focus:outline-none"

                    value = {task.content}
                    autoFocus
                    placeholder="Enter task here"
                    onBlur={toggleEditMode}
                    onKeyDown={e => { 
                        if (e.key === "Enter" && e.shiftKey) toggleEditMode();
                    }}
                    onChange={e => updateTask(task.id, e.target.value)}
                >
                    

                </textarea>
            </div>
        );
    }

    return (
        <div 
            ref = {setNodeRef}
            style = {style}
            {...attributes}
            {...listeners}
            onClick={toggleEditMode}
            className="
            bg-mainBackgroundColour
            p-2.5
            h-[50px]
            min-h-[50px]
            items-center
            flex
            text-left
            rounded-xl
            hover:ring-2
            hover:ring-insert
            hover:ring-rose-500
            cursor-grab
            relative
            task"
            onMouseEnter={() => {
                setMouseIsOver(true);
            }}
            onMouseLeave={() => {
                setMouseIsOver(false);
            }}
        >
            <p className="
                my-auto
                h-[90%] 
                w-full
                overflow-y-auto
                overflow-x-hidden
                whitespace-pre-wrap
            ">
                {task.content}
            </p>
            
            {mouseIsOver && (
                <button 
                onClick={() => {
                    deleteTask(task.id);
                }}
                className="
                stroke-white 
                absolute 
                right-4 
                top-1/2
                -translate-y-1/2
                bg-mainBackgroundColour
                rounded
                opacity-60
                hover:opacity-100
                ">
                    <Deleteicon />
                </button>
            )}
        </div>
    );
}

export default TaskCard