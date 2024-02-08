import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

export default function DataTable({
  rows,
  columns,
  perPage,
}: {
  rows: any[];
  columns: GridColDef[];
  perPage?: number;
}) {
  return (
    <div className="max-w-100" style={{ maxHeight: 800 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: perPage || 50 },
          },
        }}
        slots={{ toolbar: GridToolbar }}
      />
    </div>
  );
}
