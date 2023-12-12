const Input = ({ label, options, value, onChange }) => {
  const enhancedOptions = ["Select Language", ...options];

  return (
    <div id="filter-form">
      <label className="">
        {label}
        <select value={value} onChange={onChange}>
          {enhancedOptions.map((option) => (
            <option
              key={option}
              value={option === "Select Language" ? "" : option}
              disabled={option === "Select Language"}
            >
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Input;
