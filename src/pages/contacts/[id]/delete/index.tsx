import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { HeroInternal } from "../../../../components/HeroInternal";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { HttpDelete } from "../../../../utils/Http";
import { route } from "next/dist/server/router";
import { setError, setLoading, setRemoveUser } from "../../../../slices/users";
const Delete = () => {
  const route = useRouter();
  // const users = useSelector((state: any) => state.user.users);
  const { error, loading, users } = useSelector(
    (state: GlobalStateProps) => state.user
  );
  const user = users.find((user: UserProps) => user.id === route.query.id);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    dispatch(setLoading(true));
    dispatch(setError(""));
    const response: any = await HttpDelete(route.query?.id);
    if (response.status === 200) {
      dispatch(setRemoveUser(response.results?.id));
      route.push("/");
    } else {
      dispatch(setError(response?.results?.message));
    }
    dispatch(setLoading(false));
  };
  return (
    <div>
      <Head>
        <title>ContactDev</title>
        <meta name="description" content="ContactDev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <HeroInternal />
        <Box
          sx={{
            "& .MuiTextField-root": { m: 1, width: "20ch" },
            marginBottom: 4,
          }}
          alignContent="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {loading && <CircularProgress color="success" />}
          {error != "" && <Alert severity="error">{error}</Alert>}
          {user ? (
            <Alert variant="filled" severity="error">
              <Typography variant="h5">
                ¿Estas seguro de borrar al usuario?
              </Typography>

              <div style={{ marginTop: 4 }}>
                {user.firstName} {user.lastName}
              </div>
              <Button
                color="primary"
                variant="contained"
                sx={{ marginTop: 4 }}
                onClick={handleDelete}
              >
                Si, Eliminar
              </Button>
              <Link href="/" passHref>
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ marginTop: 4, marginLeft: 4 }}
                >
                  No, Volver al listado
                </Button>
              </Link>
            </Alert>
          ) : (
            <Alert variant="filled" severity="error">
              <Typography variant="h5">Usuario no encontrado</Typography>
              <Link href="/" passHref>
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ marginTop: 4, marginLeft: 4 }}
                >
                  Volver al listado
                </Button>
              </Link>
            </Alert>
          )}
        </Box>
      </main>
    </div>
  );
};

export default Delete;
