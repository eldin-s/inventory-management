"use client";

import { useGetUsersQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
];

const Users = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !users) {
    return (
      <div className="text-center text-red-500 py-4">Failed to get users</div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Users" />
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className="bg-gray-50 shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
        sx={{
          "& .MuiDataGrid-filler": {
            backgroundColor: "#2645cf",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#2645cf",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default Users;
