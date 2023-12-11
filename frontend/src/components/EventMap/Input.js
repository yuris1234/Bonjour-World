// const Input = ({label, ...inputProps}) => {

//     return (
//         <label className="input">
//             {label}
//             <input {...inputProps} />
//         </label>
//       );
// }

// export default Input;

import React from 'react';

const Input = ({ label, options, value, onChange }) => {
  // Add the "Any" option to the beginning of the options array
  const enhancedOptions = ['Any', ...options];

  return (
    <label className="input">
      {label}
      <select value={value} onChange={onChange}>
        {enhancedOptions.map((option) => (
          <option key={option} value={option === 'Any' ? '' : option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Input;