import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { HeroInternal } from "../../../../components/HeroInternal";
import { useForm, SubmitHandler } from "react-hook-form";
import { Alert, Box, Button, CircularProgress, TextField } from "@mui/material";
import { HttpPut } from "../../../../utils/Http";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateUser } from "../../../../slices/users";
import { useRouter } from "next/router";
import Link from "next/link";

const Edit = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const id = router.query.id as string;
  // Evento de envío al server API
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    data.id = id;
    // Los casos anteriores no se usó el dispatch desde la forma asincrona para ver el trabajo desde dos puntos
    await dispatch(fetchUpdateUser(data));
    router.push("/");
  };
  const { error, loading, users } = useSelector(
    (state: GlobalStateProps) => state.user
  );
  const currentUser = users.find((user) => user.id === id);
  return (
    <div>
      <Head>
        <title>ContactDev - Edit</title>
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
                defaultValue={currentUser?.firstName}
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
                defaultValue={currentUser?.lastName}
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
                defaultValue={currentUser?.email}
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
                defaultValue={currentUser?.phone}
              />
            </div>
            <div>
              <Button variant="contained" type="submit">
                Guardar
              </Button>
              <Link href="/" passHref>
                <Button
                  variant="contained"
                  type="button"
                  color="secondary"
                  sx={{ marginLeft: 4 }}
                >
                  Cancelar
                </Button>
              </Link>
            </div>
          </Box>
        </form>
      </main>
    </div>
  );
};

export default Edit;
