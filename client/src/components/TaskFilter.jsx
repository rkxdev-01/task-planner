const filters = ['All', 'Pending', 'Completed'];

function TaskFilter({ currentFilter, onFilterChange }) {
  return (
    <div className="filter-row">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          className={currentFilter === filter ? 'filter-btn active' : 'filter-btn'}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
