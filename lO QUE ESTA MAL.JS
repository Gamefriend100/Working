import { Button, Card, Loader, TitleCard, Empty } from "../../../../components/shared";
import { AddCircle, FactCheck } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { UseRequestContext } from "../../../../context/safety/kit/request/RequestContext";
import Table from "./Table";

const Index = () => {
  const navigate = useNavigate();
  const { data, isFeching } = UseRequestContext();

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
          onClick={() => navigate("/solicitudes")}
        >
        </Button>
      </TitleCard>

      <Card>
        {
          isFeching
            ? <Loader />
            : !data || data.length === 0
              ? <Empty msg="No hay solicitudes" />
              : <Table data={data} />
        }
      </Card>
    </div>
  );
};

export default Index;
