import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";
const Hero = () => {
  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        width: "100%",
        height: "30vh",
        backgroundImage: `url("/contact.jpeg")`,
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        color="#fff"
        sx={{
          width: "100%",
          height: "30vh",
          position: "relative",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        }}
      >
        <Typography variant="h3" component="h1">
          Listado de los Usuarios
        </Typography>
        <Link href="/contacts/create" passHref>
          <Button color="secondary" variant="contained" sx={{ marginTop: 4 }}>
            Crear Usuario
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export { Hero };
