// // src/components/tasks/TaskFilters.jsx
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSortBy, setFilterBy } from '../../redux/features/preferences/preferencesSlice';

// const TaskFilters = () => {
//   const dispatch = useDispatch();
//   const { sortBy, filterBy } = useSelector(state => state.preferences);

//   const handleSortChange = (e) => {
//     dispatch(setSortBy(e.target.value));
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     dispatch(setFilterBy({ [name]: value }));
//   };

//   return (
//     <div className="flex gap-4 mb-5">
//       <div>
//         <label htmlFor="sort" className="mr-2">Sort By:</label>
//         <select id="sort" value={sortBy} onChange={handleSortChange} className="rounded-md">
//           <option value="dueDate">Due Date</option>
//           <option value="priority">Priority</option>
//         </select>
//       </div>
//       <div>
//         <label htmlFor="priority" className="mr-2">Priority:</label>
//         <select name="priority" id="priority" value={filterBy.priority} onChange={handleFilterChange} className="rounded-md">
//           <option value="All">All</option>
//           <option value="high">High</option>
//           <option value="medium">Medium</option>
//           <option value="low">Low</option>
//         </select>
//       </div>
//       <div>
//         <label htmlFor="status" className="mr-2">Status:</label>
//         <select name="status" id="status" value={filterBy.status} onChange={handleFilterChange} className="rounded-md">
//           <option value="All">All</option>
//           <option value="pending">Pending</option>
//           <option value="inProgress">In Progress</option>
//           <option value="complete">Completed</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default TaskFilters;





import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy, setFilterBy } from '../../redux/features/preferences/preferencesSlice';

const TaskFilters = () => {
  const dispatch = useDispatch();
  const { sortBy, order, filterBy } = useSelector(state => state.preferences);

  const handleSortChange = (e) => {
    dispatch(setSortBy({ sortBy: e.target.value, order }));
  };

  const handleOrderChange = (e) => {
    dispatch(setSortBy({ sortBy, order: e.target.value }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilterBy({ [name]: value }));
  };

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 mb-5">
      <div>
        <label htmlFor="sort" className="mr-2">Sort By:</label>
        <select id="sort" value={sortBy} onChange={handleSortChange} className="rounded-md leading-4 md:leading-6 text-xs md:text-sm">
          <option value="">None</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      {sortBy && (
        <div>
          <label htmlFor="order" className="mr-2">Order:</label>
          <select id="order" value={order} onChange={handleOrderChange} className="rounded-md leading-4 md:leading-6 text-xs md:text-sm">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      )}
      <div>
        <label htmlFor="priority" className="mr-2">Priority:</label>
        <select name="priority" id="priority" value={filterBy.priority} onChange={handleFilterChange} className="rounded-md leading-4 md:leading-6 text-xs md:text-sm">
          <option value="All">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div>
        <label htmlFor="status" className="mr-2">Status:</label>
        <select name="status" id="status" value={filterBy.status} onChange={handleFilterChange} className="rounded-md leading-4 md:leading-6 text-xs md:text-sm">
          <option value="All">All</option>
          <option value="pending">Pending</option>
          <option value="inProgress">In Progress</option>
          <option value="complete">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilters;
