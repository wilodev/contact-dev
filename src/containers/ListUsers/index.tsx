import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  TableCell,
  tableCellClasses,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1, minWidth: 150 },
  { field: "firstName", headerName: "Nombre", flex: 1 },
  { field: "lastName", headerName: "Apellido", flex: 1 },
  {
    field: "phone",
    headerName: "Phone",
    type: "number",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 100,
    cellClassName: "actions",
    renderCell: (params: any) => {
      return (
        <>
          <Link href={`/contacts/${params.id}/edit`} passHref>
            <Button>
              <EditIcon />
            </Button>
          </Link>
          <Link href={`/contacts/${params.id}/delete`} passHref>
            <Button>
              <DeleteIcon />
            </Button>
          </Link>
        </>
      );
    },
  },
];
const ListUsers = ({ ...data }) => {
  return (
    <Box sx={{ width: 1, marginTop: 4 }}>
      <Box sx={{ height: 350, width: 1, mb: 2 }}>
        <DataGrid
          rows={data.users}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </Box>
    </Box>
  );
};

export default ListUsers;
