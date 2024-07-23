function Select({ title, options, selectedOption, onChange }) {
  function handleOnChange(e) {
    onChange(JSON.parse(e.target.value));
  }

  return (
    <div>
      <h3>{title}</h3>
      <select value={selectedOption} onChange={handleOnChange}>
        {options.map((option) => {
          return <option key={option.name} value={JSON.stringify(option)}>
            {option.name}
          </option>;
        })}
      </select>
    </div>
  );
}

export default Select;
