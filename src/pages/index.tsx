import type { NextPage } from "next";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { Hero } from "../components/Hero";
import ListUsers from "../containers/ListUsers";
import { setPagination, setUsers } from "../slices/users";
import styles from "../styles/Home.module.css";
import { HttpGetAll } from "../utils/Http";

const Home = ({ usersServer }: { usersServer: ResponseServer }) => {
  const dispatch = useDispatch();
  dispatch(setUsers(usersServer.results));
  dispatch(setPagination(usersServer));
  const users = useSelector((state: GlobalStateProps) => state.user);
  return (
    <div className={styles.container}>
      <Head>
        <title>ContactDev</title>
        <meta name="description" content="ContactDev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Hero />
        {/* Mostramos todos los usuarios del estado */}
        <ListUsers {...users} />
        {/* Condición para mostrar o no la paginación */}
      </main>
    </div>
  );
};

// Se realiza la carga incial desde el servidor
export async function getStaticProps() {
  // realizar un contador de usaurios y hacer el buccle
  // Carga inicial de 10 Usuarios desde el api
  const data = await HttpGetAll({ totalPerPages: 10, page: 1 });

  return {
    props: {
      usersServer: data,
    },
  };
}

export default Home;
