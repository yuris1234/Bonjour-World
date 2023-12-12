const Input = ({ label, options, value, onChange }) => {
  const enhancedOptions = ["All Languages", ...options];

  return (
    <div id="filter-form">
      <label className="">
        {label}
        <select value={value} onChange={onChange}>
          {enhancedOptions.map((option) => (
            <option key={option} value={option === "All Languages" ? "" : option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Input;
