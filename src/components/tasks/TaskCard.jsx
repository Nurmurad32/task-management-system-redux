import React from 'react';
import { ArrowRightIcon, EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import {
  deleteTask,
  updateTask,
} from '../../redux/features/tasks/tasksSlice';
import { Link } from 'react-router-dom';

const TaskCard = ({ task, openEditModal }) => {
  const dispatch = useDispatch();

  const handleStatusUpdate = (id) => {
    let updatedStatus;

    if (task.status === 'pending') {
      updatedStatus = 'inProgress';
    } else if (task.status === 'inProgress') {
      updatedStatus = 'complete';
    }
    dispatch(updateTask({ id: id, task: { status: updatedStatus } }))
  }

  return (
    <div className="bg-secondary/10 rounded-md p-3 md:p-5">

      <div className='flex flex-col md:flex-row justify-between items-start'>
        <h1
          className={`text-sm md:text-lg font-semibold mb-3 ${task.priority === 'high' ? 'text-red-500' : ' '
            } ${task.priority === 'medium' ? 'text-yellow-500' : ' '} ${task.priority === 'low' ? 'text-green-500' : ' '
            } ${task.status === 'complete' ? 'line-through' : ' '}`}
        >
          {task?.title}
        </h1>
        <p className={`hidden md:block text-xs px-2 py-1 rounded ${task.priority === 'high' ? 'text-white bg-red-500' : ' '
          } ${task.priority === 'medium' ? 'text-white bg-yellow-500' : ' '} ${task.priority === 'low' ? 'text-white bg-green-500' : ' '
          }`}>{task.priority.toUpperCase()}</p>
      </div>
      {
        task?.status !== "complete" &&
        <>
          <p className="my-3 bg-white rounded p-1">{task?.description?.slice(0, 25)}...</p>
          <p className="text-xs md:text-sm">Due date: {task?.dueDate}</p>
        </>
      }
      <div className={`flex ${task?.status === "complete" ? "justify-center" : "justify-end"} mt-3`}>
        <div className="flex gap-3 ">
          {/* <button title="Edit">
            <Link to={`/tasks/${task?._id}`} ><EyeIcon className="h-5 w-5 text-gray-500" /></Link>
          </button> */}
          <button onClick={() => openEditModal(task?._id)} title="View & Edit">
            <PencilSquareIcon className="h-4 md:h-5 w-4 md:w-5 text-gray-500" />
          </button>
          <button onClick={() => dispatch(deleteTask(task._id))} title="Delete">
            <TrashIcon className="h-4 md:h-5 w-4 md:w-5 text-red-500" />
          </button>
          {
            task?.status !== "complete" &&
            <button
              onClick={() => handleStatusUpdate(task._id)}
              title="Update Status"
            >
              <ArrowRightIcon className="h-4 md:h-5 w-4 md:w-5 text-primary" />
            </button>
          }
        </div>
      </div>
    </div>
  )
};

export default TaskCard;
