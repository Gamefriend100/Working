import { UseSuppliesContext } from '../../../../context/safety/kit/supplies/SuppliesContext';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import Actions from '../../../../components/safety/kit/supplies/Actions';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Segment } from "@mui/icons-material";
import { useMemo } from 'react';

const Table = () => { 
  const { supplies, isFetching } = UseSuppliesContext();

  const columns = useMemo(
    () => [
      {
        header: 'IDENTIFICADOR',
        accessorKey: 'identifier',
        size: 80,
      },
      {
        header: 'NOMBRE',
        accessorKey: 'name',
      },
      {
        header: 'PRESENTACION',
        accessorKey: 'specification',
      },
      {
        header: 'CATEGORIA',
        accessorFn: row => row.category?.name || 'Sin categoría',
      },
    ],
    [],
  );
   const table = useMaterialReactTable({
    columns,
    data: supplies || [],
    enableColumnActions: false,
    enableColumnDragging: false,
    enableColumnFilterModes: false,
    enableColumnFilters: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableGrouping: true,
    enableRowActions: true,
    enableStickyHeader: true,
    enableTopToolbar: false,
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    localization: MRT_Localization_ES,
    initialState: {
      showColumnFilters: true,
      density: "compact",
      pagination: { pageSize: 10 },
      columnPinning: {
        right: ['mrt-row-actions']
      },
    },
    state: {
      isLoading: isFetching,
    },
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "primary",
      rowsPerPageOptions: [10, 15, 25, 35],
      shape: "rounded",
      variant: "outlined",
      sx: {
        ".MuiPaginationItem-root": {
          borderRadius: "50%",
          "&:hover": {
            background: "rgba(25, 118, 210,0.2)",
            color: "#1976d2",
          },
        },
        ".Mui-selected": {
          backgroundColor: "#1976d2",
          color: "white",
        },
      },
    },
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "ACCIONES",
      },
    },
    muiTableHeadCellProps: {
      sx: {
        fontSize: "0.75rem",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        fontSize: "0.75rem",
      },
    },
    muiFilterTextFieldProps: {
      size: "small",
      InputProps: {
        sx: {
          fontSize: "0.75rem",
        },
      },
    },
    muiTableContainerProps: {
      sx: {
        maxHeight: "calc(100vh - 400px)",
      },
    },
    muiTablePaperProps: {
      sx: {
        boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.1)",
      },
    },
    renderRowActionMenuItems: ({ closeMenu, row }) => (
      <Actions closeMenu={closeMenu} row={row} />
    ),
  });

  const totalRecords = table.getFilteredRowModel().rows.length;
  
    return (
        <div className="relative">
          <MaterialReactTable table={table} />
          <div className="absolute p-4 text-sm rounded-r-lg -mt-14 z-10 flex justify-center items-center gap-2">
            <Segment fontSize="small" />{" "}
            <span className="text-[12px]">{`${totalRecords.toLocaleString()} registro${
              totalRecords !== 1 ? "s" : ""
            }`}</span>
          </div>
        </div>
    );
};

export default Table;
