import { UseRequestContext } from '../../../../context/safety/kit/request/RequestContext';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Segment } from "@mui/icons-material";
import { useMemo } from 'react';
import { getIconStatusId, getStatus} from '../../../../helpers/safety'


const Table = () => {
  const { data, isFeching } = UseRequestContext();

  const columns = useMemo(
    () => [
      {
        header: 'USUARIO',
        accessorKey: 'user.fullName',
      },
      {
        header: 'ASOCIACIÓN',
        accessorKey: 'user.branch.name',
      },
      {
        header: 'ESTADO',
        accessorKey: 'status',
        Cell: ({ cell }) => (
          <span className={`inline-flex items-center gap-1 px-2 py-1 shadow-md rounded-full font-semibold text-[10px] ${getStatus(cell.getValue().id)}`}>
            {getIconStatusId(cell.getValue().id)}
            {cell.getValue().name}
          </span>
        )
      },
      {
        header: 'CANCELACIÓN',
        accessorKey: 'cancellation',
        Cell: ({ cell }) => cell.getValue()?.name === "",
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: data || [],
    enableColumnActions: false,
    enableColumnDragging: false,
    enableColumnFilterModes: false,
    enableColumnFilters: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableGrouping: true,
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
        right: [],
      },
      columnOrder: [
        'user.fullName',
        'user.branch.name',
        'status.name',
        'cancellation.name',
      ],
    },

    state: {
      isLoading: isFeching,
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
        endAdornment: null,
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
  });

  const totalRecords = table.getFilteredRowModel().rows.length;

  return (
    <div className="relative">
      <MaterialReactTable table={table} />
      <div className="absolute p-4 text-sm rounded-r-lg -mt-14 z-10 flex justify-center items-center gap-2">
        <Segment fontSize="small" />
        <span className="text-[12px]">
          {`${totalRecords.toLocaleString()} registro${totalRecords !== 1 ? "s" : ""}`}
        </span>
      </div>
    </div>
  );
};

export default Table;
