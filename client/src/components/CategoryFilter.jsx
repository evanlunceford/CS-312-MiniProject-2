import "./CategoryFilter.css";

function CategoryFilter({ options, selected, onChange }) {
  return (
    <div className="category-filter">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={option === selected ? "active" : ""}
          onClick={() => onChange(option)}
        >
          {option === "ALL" ? "All" : option}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
