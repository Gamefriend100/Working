import { TitleCard, Loader } from '../../../../components/shared'
import { LocalHospital } from '@mui/icons-material'
import { UseSuppliesContext } from '../../../../context/safety/kit/supplies/SuppliesContext'
import Table from './Table'

const Index = () => {

  const { supplies, isFeching } = UseSuppliesContext();

  return (
    <div className='space-y-6'>
      <TitleCard 
        title="INSUMOS"
        desc="Gestión de insumos del botiquín"
        icon={<LocalHospital />}
      />

      { isFeching 
        ? <Loader />
        : <Table data={supplies} />
      }
      
    </div>
  )
}

export default Index;