import { Button, Card, Loader, TitleCard } from "../../../../components/shared";
import { AddCircle, FactCheck } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { UseRequestContext } from "../../../../context/safety/kit/request/RequestContext";
import Table from "./Table";

const Index = () => {
  const goTo = useNavigate();
  const { data, isFetching } = UseRequestContext();

  return (
    <div className="space-y-6">

      <TitleCard
        title="SOLICITUDES"
        desc="Gestión de solicitudes de botiquines por sucursal"
        icon={<FactCheck />}
      >
        <Button
          variant="contained"
          size="small"
          text={"Crear Solicitud"}
          startIcon={<AddCircle sx={{ fontSize: 16 }} />}
          onClick={() => goTo("/seguridad/botiquin/solicitudes/crear")}
        >
        </Button>
      </TitleCard>

      {
        isFetching ?
          <Card>
            <Loader />
          </Card>
          : <Table data={data} />
      }
    </div>
  );
};

export default Index;
