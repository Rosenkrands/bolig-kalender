import { Link, Typography } from "@mui/material";

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: "text.secondary",
        width: "100%",
      }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://google.com/">
        Sample App
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}
