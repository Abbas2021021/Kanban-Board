import { SortableContext, useSortable } from '@dnd-kit/sortable';
import Deleteicon from '../icons/Deleteicon';
import {Column, Id, Task} from '../types';
import {CSS} from '@dnd-kit/utilities';
import { useMemo, useState } from 'react';
import Plusicon from '../icons/Plusicon';
import TaskCard from './TaskCard';

interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string) => void;
    createTask: (columnId: Id) => void;
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void;
    tasks: Task[];
}

function ColumnContainer(props: Props) {
    const {column, deleteColumn, updateColumn, createTask, tasks, deleteTask, updateTask} = props;

    const [editMode, setEditMode] = useState(false);

    const tasksIds = useMemo(() => {
        return tasks.map((task) => task.id);
    }, [tasks]); 
    
    const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
        id: column.id,
        data: {
            type: 'Column',
            column,
        },
        disabled: editMode,
    });

    {/* Allows columns to swtich positions amongst them */}
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
        opacity-40
        border-2
        border-rose-500
        bg-columnBackgroundColour
        w-[350px]
        h-[500px]
        max-h-[500px]
        rounded-md
        flex
        flex-col
        "> 
            
            
        </div>
        );
    }
    {/* Sets the columns to a set height and width in the start with a max height too*/}
    return (
    <div 
        ref = {setNodeRef}
        style={style}
        className="
        bg-columnBackgroundColour
        w-[350px]
        h-[500px]
        max-h-[500px]
        rounded-md
        flex
        flex-col

    ">
        {/* Column title */}
        <div 
            {...attributes}
            {...listeners}
            onClick={() => {
                setEditMode(true); 
            }}
            className="
            bg-mainBackgroundColour
            text-md
            h-[60px]
            cursor-grab
            rounded-lg
            p-3
            font-bold
            border-columnBackgroundColour
            border-4
            flex
            items-center
            justify-between
        ">
            <div className="flex gap-2">
                
                {!editMode && column.title}
                {editMode && 
                (<input 
                    className='
                    bg-black
                    focus:border-rose-500
                    border
                    rounded
                    outline-none
                    px-2
                    '
                    value={column.title}
                    onChange={e => updateColumn(column.id, e.target.value)}
                    autoFocus 
                    onBlur={() => {
                        setEditMode(false);
                    }}
                    onKeyDown={e => {
                        if (e.key !== "Enter") return;
                        setEditMode(false);
                    }}
                />
                )}
            </div>
            <button 
            onClick={() => {
                deleteColumn(column.id);
            }}
            className="
                stroke-gray-500
                hover:stroke-white
                hover:bg-mainBackgroundColour
                rounded
                px-1
                py-2
                opacity-60
                hover:opacity-100
            ">
                <Deleteicon />
            </button>
        </div>
        
        
        {/* Column task container */}
        <div className="
        flex
        flex-grow
        flex-col
        gap-4
        p-2
        overflow-x-hidden
        overflow-y-auto">
            <SortableContext items = {tasksIds}>
                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask}/>
                ))}
            </SortableContext>
        </div>
        {/* Column footer */}
        <button className="
        flex
        gap-2
        items-center
        border-columnBackgroundColour
        border-2
        rounded-lg
        p-4 
        border-x-columnBackgroundColour
        hover:bg-mainBackgroundColour
        hover:text-rose-500
        active:bg-black"
        onClick={() => {
            createTask(column.id);
        }}>
            <Plusicon />
            Add Task
        </button>
    </div>
    );
}

export default ColumnContainer