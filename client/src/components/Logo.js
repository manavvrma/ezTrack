import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = ({ name }) => {
  return (
    <Link
      to="/"
      className="brand"
      style={{
        textDecoration: "none",
      }}
    >
      <img src="/logo192.png" alt=" logo" />
      {name && (
        <Typography
          variant="h5"
          component="h1"
          className="brand-name"
          style={{ fontWeight: "bold", fontStyle: "italic" }}
        >
          ezTrack
        </Typography>
      )}
    </Link>
  );
};

export default Logo;
