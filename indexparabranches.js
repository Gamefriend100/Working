import { TitleCard } from '../../../../components/shared'
import { Vaccines } from '@mui/icons-material'
import { UseAppContext } from '../../../../context/AppContext'

// 1. Sub-componente para la Card (Encapsulación)
const BranchCard = ({ branch }) => (
  <div className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition">
    <h3 className="font-semibold text-lg">{branch.label}</h3>
    <p className="text-sm text-gray-500">ID: {branch.value}</p>
    {branch.zoneId && <p className="text-sm mt-2">Zona ID: {branch.zoneId}</p>}
  </div>
);

const Index = () => {
  const { branches, isFetchingBranches } = UseAppContext();

  return (
    <div className='space-y-6'>
      <TitleCard 
        title="BOTIQUÍN POR SUCURSAL" 
        desc="Gestión de insumos" 
        icon={<Vaccines/>} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isFetchingBranches ? (
          <p className="text-gray-500">Cargando sucursales...</p>
        ) : (
          branches?.map((branch) => <BranchCard key={branch.value} branch={branch} />)
        )}
      </div>
    </div>
  );
};

export default Index;
