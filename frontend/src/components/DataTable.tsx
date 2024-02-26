import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

interface DataTableProps {
  rows: any[];
  columns: GridColDef[];
  perPage?: number;
}

export const DataTable = ({ rows, columns, perPage = 50 }: DataTableProps) => (
  <div
    className="max-w-100 bg-white dark:bg-slate-900"
    style={{ maxHeight: 800 }}
  >
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: perPage },
        },
      }}
      slots={{ toolbar: GridToolbar }}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "bg-slate-100" : ""
      }
    />
  </div>
);
