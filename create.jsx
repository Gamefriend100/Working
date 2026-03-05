import { AddCircle, Grading } from "@mui/icons-material";
import { Button, Card, Empty, TitleCard } from "../../../../components/shared";
import { UseRequestContext } from "../../../../context/safety/kit/request/RequestContext";
import { UseKitContext } from "../../../../context/safety/kit/KitContext";
import Form from "./Form";

const Create = () => {
  const { setModalRequest, requests } = UseRequestContext();
  const { supplies } = UseKitContext();

  const handleClick = () => {
    setModalRequest({ show: true, children: <Form /> });
  };

  const lastRequest = requests[0];
  const supplyFound = lastRequest
    ? supplies.find((s) => s.value === lastRequest.supplyId)
    : null;

  return (
    <div className="space-y-6">

      <TitleCard
        title="CREAR SOLICITUD"
        desc="Agrega los insumos que deseas solicitar"
        icon={<Grading />}
      >
        <Button
          variant="contained"
          size="small"
          text="Agregar Insumo"
          startIcon={<AddCircle sx={{ fontSize: 16 }} />}
          onClick={handleClick}
        />
      </TitleCard>

      <Card>
        {supplyFound ? (
          <div className="p-3 border rounded-lg bg-gray-50">
            {supplyFound.label} </div> ) : ( <Empty msg="No hay solicitudes" />
        )}
      </Card>

    </div>
  );
};

export default Create;
