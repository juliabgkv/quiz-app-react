import { Button } from "@mui/material";

function HomeButton({ children, onBackHome }) {
  return <Button variant="outlined" onClick={onBackHome}>{children}</Button>;
}

export default HomeButton;
