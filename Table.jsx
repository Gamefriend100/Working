import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { useMemo } from 'react';
import { BarCard } from '../../../../components/shared';

const Table = ({ data }) => {

  const columns = useMemo(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
        size: 80,
      },
      {
        header: 'NOMBRE',
        accessorKey: 'name',
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    localization: MRT_Localization_ES,

    enableColumnActions: false,
    enableColumnDragging: false,
    enableGrouping: false,
    enableRowActions: false,

    initialState: {
      density: 'compact',
      pagination: { pageSize: 10 },
      showGlobalFilter: true,
    },
  });

  return (
    <BarCard noPadding={true}>
      <MaterialReactTable table={table} />
    </BarCard>
  );
};

export default Table;