import { useForm } from 'react-hook-form';
import Modal from '../ui/Modal';
import { useDispatch } from 'react-redux';
import { clearSelectedTask, createTask, updateTask } from '../../redux/features/tasks/tasksSlice';
import React, { useEffect } from 'react';

const AddTaskModal = ({ isOpen, setIsOpen, selectedTask, onClose }) => {
  const { register, handleSubmit, reset, setValue } = useForm();

  const dispatch = useDispatch();

  // console.log(selectedTask)

  useEffect(() => {
    if (selectedTask) {
      setValue('title', selectedTask.title);
      setValue('description', selectedTask.description);
      setValue('dueDate', selectedTask.dueDate);
      setValue('priority', selectedTask.priority);
      setValue('status', selectedTask.status);
    } else {
      reset();
    }
  }, [selectedTask, setValue, reset]);

  const onSubmit = (data) => {

    if (selectedTask) {
      // Update existing task
      dispatch(updateTask({ id: selectedTask._id, task: data }));
    } else {
      // Create new task
      dispatch(createTask(data));
    }
    onCancel();
  };

  const onCancel = () => {
    reset();
    setIsOpen(false);
    onClose()
    dispatch(clearSelectedTask());
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Task">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-5">
          <label htmlFor="title" className="mb-2">
            Title
          </label>
          <input
            className="w-full rounded-md"
            type="text"
            id="title"
            defaultValue={selectedTask && selectedTask?.title}
            {...register('title')}
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="title" className="mb-2">
            Description
          </label>
          <textarea
            className="w-full rounded-md"
            type="text"
            id="description"
            {...register('description')}
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="title" className="mb-2">
            Due Date
          </label>
          <input
            className="w-full rounded-md"
            type="date"
            id="date"
            {...register('dueDate')}
          />
        </div>

        <div className="flex flex-col mb-5">
          <label htmlFor="title" className="mb-2">
            Priority
          </label>
          <select
            className="w-full rounded-md"
            id="priority"
            {...register('priority')}
          >
            <option defaultValue value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="title" className="mb-2">
            Status
          </label>
          <select
            className="w-full rounded-md"
            id="status"
            {...register('status')}
          >
            <option defaultValue value="pending">Pending</option>
            <option value="inProgress">In Progress</option>
            <option value="complete">Complete</option>
          </select>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => onCancel()}
            type="button"
            className="btn btn-danger "
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary ">
            {selectedTask ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
