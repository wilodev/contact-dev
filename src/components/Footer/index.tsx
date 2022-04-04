import { Box, Link } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flex: 1,
        padding: "2rem 0",
        borderTop: "1px solid #eaeaea",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link
        href="https://github.com/wilodev"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by @wilodev
      </Link>
    </Box>
  );
};

export default Footer;
