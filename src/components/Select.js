function Select({ title, options, selectedOption, onChange }) {
  return (
    <div>
      <h3>{title}</h3>
      <select value={selectedOption} onChange={(e) => onChange(e.currentTarget.value)}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
