import { useState } from "react";
import { HttpGet } from "../utils/Http";

const useLoadServer = async ({ totalPerPages, page }: PaginationProps) => {
  const [data, setData] = useState([]);
  (async () => {
    const responseServer = await HttpGet({ totalPerPages, page });
    setData(responseServer);
  })();
  return data;
};

export { useLoadServer };
