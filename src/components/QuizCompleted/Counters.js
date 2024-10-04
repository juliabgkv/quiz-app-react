import { Stack } from "@mui/material";
import { capitalize } from "../../utils";
import CounterItem from "./CounterItem";

function Counters({ answersCount }) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ width: "100%", my: 3 }}
      justifyContent="center"
    >
      {Object.keys(answersCount).map((key) => (
        <CounterItem key={`counter-${key}`} quantity={answersCount[key]} name={capitalize(key)} />
      ))}
    </Stack>
  );
}

export default Counters;
