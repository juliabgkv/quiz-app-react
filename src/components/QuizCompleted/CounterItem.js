import { Paper, Typography } from "@mui/material";

function CounterItem({ quantity, name }) {
  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <Typography variant="h5">{quantity}</Typography>
      <Typography variant="body2" color="text.secondary">
        {name}
      </Typography>
    </Paper>
  );
}

export default CounterItem;
