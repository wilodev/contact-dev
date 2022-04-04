import React from "react";
import { TableCell } from "@mui/material";

const User = ({ ...data }: UserProps) => {
  return (
    <>
      <TableCell component="th" scope="row">
        {data.firstName} {data.lastName}
      </TableCell>
      <TableCell align="right">{data.email}</TableCell>
      <TableCell align="right">{data.phone}</TableCell>
      <TableCell align="right">{data.id}</TableCell>
    </>
  );
};

export { User };
