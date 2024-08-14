import { FormGroup, InputLabel, MenuItem, Select } from "@mui/material";

function SelectOption({ title, options, selectedOption, onChange }) {
  function handleOnChange(e) {
    onChange(JSON.parse(e.target.value));
  }

  return (
    <FormGroup sx={{ mb: "1rem" }}>
      <InputLabel id={title}>{title}</InputLabel>
      <Select labelId={title} value={selectedOption} onChange={handleOnChange}>
        {options.map((option) => {
          return <MenuItem key={option.name} value={JSON.stringify(option)}>
            {option.name}
          </MenuItem>;
        })}
      </Select>
    </FormGroup>
  );
}

export default SelectOption;
