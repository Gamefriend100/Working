import { TitleCard, Card, SelectBranch, Loader, Empty } from '../../../../components/shared'
import { Vaccines } from '@mui/icons-material'
import { UseBranchesContext } from '../../../../context/safety/kit/branches/BranchesContext';
import ItemSupply from '../../../../components/safety/kit/branches/ItemSupply';
import { UseAppContext } from '../../../../context/AppContext';


const Index = () => {
  const { data, isFeching, setSelectBranch, selectBranch } = UseBranchesContext();
  const { hasRole } = UseAppContext();

  return (
    <div className='space-y-6'>
      <TitleCard
        title="BOTIQUÍN POR SUCURSAL"
        desc="Gestión de insumos"
        icon={<Vaccines />}
      />
      {hasRole(["ADMIN", "TALENTO HUMANO"]) &&
      <Card> 
        <SelectBranch
          value={selectBranch}
          handleChange={({ value }) => setSelectBranch(value)} >
        </SelectBranch>
      </Card>
        }

      <Card classes="flex flex-col gap-3">
        {isFeching
          ? (<Loader />)
          :  data?.length === 0 ? <Empty msg='No hay insumos asignados a esta sucursal' />
          : (data?.map((element) => <ItemSupply key={element.id} supply={element.supply} />))
        }
      </Card>
    </div>
  );
};

export default Index;
