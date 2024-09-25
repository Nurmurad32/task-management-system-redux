import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import TaskCard from '../components/tasks/TaskCard';
import AddTaskModal from '../components/tasks/AddTaskModal';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuDropdown from '../components/ui/MenuDropdown';
import { clearSelectedTask, clearStatus, fetchSingleTask, fetchTasks } from '../redux/features/tasks/tasksSlice';
import toast from 'react-hot-toast';
import TaskFilters from '../components/tasks/TaskFilters';

const Tasks = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { items: tasks, selectedTask, success, error, tasksStatus } = useSelector((state) => state.tasksSlice);
  const preferences = useSelector(state => state.preferences);

  useEffect(() => {
    // if (tasksStatus === 'idle') {
    dispatch(fetchTasks());
    // }
  }, [dispatch, preferences, tasksStatus, success]);


  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearStatus());  // Clear the success message after showing the toast
    }
    if (error) {
      toast.error(error);
      dispatch(clearStatus());  // Clear the error message after showing the toast
    }
  }, [success, error, dispatch]);

  const openEditModal = useCallback((id) => {
    dispatch(fetchSingleTask(id));
    setIsOpen(true);
  }, [dispatch]);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
    dispatch(clearSelectedTask());
  }, [dispatch]);

  const pendingTasks = useMemo(() => tasks?.filter((item) => item.status == 'pending'), [tasks]);

  const inProgressTasks = useMemo(() => tasks?.filter((item) => item.status == 'inProgress'), [tasks]);

  const doneTasks = useMemo(() => tasks?.filter((item) => item.status == 'complete'), [tasks]);


  return (
    <>
      <AddTaskModal isOpen={isOpen} setIsOpen={setIsOpen} selectedTask={selectedTask} onClose={handleCloseModal} />

      <div className=" px-3 md:px-10 pt-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-semibold text-2xl md:text-3xl">Tasks</h1>
          </div>
          <div className="flex items-center gap-2 md:gap-5">
            <button className="border-2 border-secondary/20 hover:border-primary hover:bg-primary rounded-xl h-8 md:h-10 w-10  grid place-content-center text-secondary hover:text-white transition-all">
              <MagnifyingGlassIcon className="h-4 md:h-6 w-4 md:w-6" />
            </button>
            <button className="border-2 border-secondary/20 hover:border-primary hover:bg-primary rounded-xl h-8 md:h-10 w-10 grid place-content-center text-secondary hover:text-white transition-all">
              <BellIcon className="h-4 md:h-6 w-4 md:w-6" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn btn-primary"
            >
              Add Task
            </button>
            <MenuDropdown>
              <div className="h-10 w-10 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=644&q=80"
                  alt=""
                  className="object-cover h-full w-full "
                />
              </div>
            </MenuDropdown>
          </div>
        </div>
        <div className='mt-4 md:mt-10 '>
          <TaskFilters />
        </div>
        <hr />
        <div className="grid grid-cols-3  gap-2 md:gap-5 mt-5">
          {/* <div className="relative h-[800px] overflow-auto"> */}
          <div>
            <div className="flex justify-between bg-[#D3DDF9] px-3 py-2 md:p-5 rounded-md mb-3">
              <h1 className='text-sm md:text-lg'>Pending</h1>
              <p className="bg-primary text-white w-6 h-6 grid place-content-center rounded-md text-sm md:text-md">
                {pendingTasks?.length}
              </p>
            </div>
            <div className="space-y-3">
              {pendingTasks?.map((item) => (
                <TaskCard key={item._id} task={item} openEditModal={openEditModal} />
              ))}
            </div>
          </div>
          {/* <div className="relative h-[800px] overflow-auto"> */}
          <div>
            <div className="flex justify-between bg-[#D3DDF9] px-3 py-2 md:p-5 rounded-md mb-3">
              <h1 className='text-sm md:text-lg'>In Progress</h1>
              <p className="bg-primary text-white w-6 h-6 grid place-content-center rounded-md text-sm md:text-md">
                {inProgressTasks?.length}
              </p>
            </div>
            <div className="space-y-3">
              {inProgressTasks?.map((item) => (
                <TaskCard key={item._id} task={item} openEditModal={openEditModal} />
              ))}
            </div>
          </div>
          {/* <div className="relative h-[800px] overflow-auto"> */}
          <div>
            <div className="flex justify-between bg-[#F0F8F1] px-3 py-2 md:p-5 rounded-md mb-3">
              <h1 className='text-sm md:text-lg'>Completed</h1>
              <p className="bg-[#78BB7B] text-white w-6 h-6 grid place-content-center rounded-md text-sm md:text-md">
                {doneTasks?.length}
              </p>
            </div>
            <div className="space-y-3">
              {doneTasks?.map((item) => (
                <TaskCard key={item._id} task={item} openEditModal={openEditModal} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tasks;
