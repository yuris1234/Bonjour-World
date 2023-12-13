const Input = ({ label, options, value, onChange }) => {
  const enhancedOptions =
    label === 'State' ? ['Any State', ...options] : ['All Languages', ...options];

  return (
    <div id="filter-form">
      <label className="">
        {label}
        <select value={value} onChange={onChange}>
          {enhancedOptions.map((option) => (
            <option key={option} value={option === 'All Languages' || option === 'Any State' ? '' : option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Input;
