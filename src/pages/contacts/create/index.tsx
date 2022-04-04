import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { HeroInternal } from "../../../components/HeroInternal";
import { useForm, SubmitHandler } from "react-hook-form";
import { Alert, Box, Button, CircularProgress, TextField } from "@mui/material";
import { HttpPost } from "../../../utils/Http";
import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading, setUser } from "../../../slices/users";
import { useRouter } from "next/router";

const Create = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  // Evento de envío al server API
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    // Asi se trabajaría implementando un hook si no tenemos redux y solo context Api
    dispatch(setLoading(true));
    dispatch(setError(""));
    const responseServer: any = await HttpPost(data);
    if (responseServer.status === 200) {
      dispatch(setUser(responseServer.results));
      router.push("/");
    } else {
      dispatch(setError(responseServer?.results.message));
    }
    dispatch(setLoading(false));
  };
  const { error, loading } = useSelector(
    (state: GlobalStateProps) => state.user
  );
  return (
    <div>
      <Head>
        <title>ContactDev - Create</title>
        <meta name="description" content="ContactDev Create Contact" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <HeroInternal />
        {loading && <CircularProgress color="success" />}
        {error != "" && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
              marginBottom: 4,
            }}
            alignContent="center"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <div>
              <TextField
                error={errors.firstName && true}
                id="standard-error-helper-text"
                label="Nombre"
                {...register("firstName", { required: true, minLength: 3 })}
                placeholder="Wilson"
                helperText={
                  errors?.firstName?.type === "required"
                    ? "Este campo es requerido"
                    : errors?.firstName?.type === "minLength" &&
                      "Debe tener un mínimo de 3 caracteres"
                }
                variant="standard"
              />
              <TextField
                error={errors.lastName && true}
                id="standard-error-helper-text"
                label="Apellido"
                {...register("lastName", { required: true, minLength: 3 })}
                placeholder="Pérez"
                helperText={
                  errors?.lastName?.type === "required"
                    ? "Este campo es requerido"
                    : errors?.lastName?.type === "minLength" &&
                      "Debe tener un mínimo de 3 caracteres"
                }
                variant="standard"
              />
            </div>
            <div>
              <TextField
                error={errors.email && true}
                id="standard-error-helper-text"
                label="Email"
                {...register("email", {
                  required: true,
                  validate: (value) => value.includes("@"),
                })}
                placeholder="wilson@perez.com"
                helperText={
                  errors?.email?.type === "required"
                    ? "Este campo es requerido"
                    : errors?.email?.type === "validate" &&
                      "Debe ser un email válido"
                }
                variant="standard"
              />
              <TextField
                error={errors.phone && true}
                id="standard-error-helper-text"
                label="Teléfono"
                {...register("phone", {
                  required: true,
                  minLength: 10,
                  maxLength: 10,
                })}
                placeholder="005912345678"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                helperText={
                  errors?.phone?.type === "required"
                    ? "Este campo es requerido"
                    : errors?.phone?.type === "minLength"
                    ? "Debe tener 10 caracteres"
                    : errors?.phone?.type === "maxLength" &&
                      "Debe tener 10 caracteres"
                }
                variant="standard"
              />
            </div>
            <div>
              <Button variant="contained" type="submit">
                Enviar
              </Button>
            </div>
          </Box>
        </form>
      </main>
    </div>
  );
};

export default Create;
