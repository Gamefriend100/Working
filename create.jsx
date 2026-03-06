import { AddCircle, Grading } from "@mui/icons-material";
import { Button, Card, Empty, TitleCard } from "../../../../components/shared";
import { UseRequestContext } from "../../../../context/safety/kit/request/RequestContext";
import { UseKitContext } from "../../../../context/safety/kit/KitContext";
import Form from "./Form";

const Create = () => {
  const { setModalRequest, selectedSupplies } = UseRequestContext();
  const { supplies } = UseKitContext();

  const handleClick = () => {
    setModalRequest({ show: true, children: <Form /> });
  };

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
          text={"Agregar Insumo"}
          startIcon={<AddCircle sx={{ fontSize: 16 }} />}
          onClick={handleClick}
        />
      </TitleCard>

      <Card>
        {selectedSupplies.length === 0 ? (
          <Empty msg="No hay solicitudes" />
        ) : (
          supplies
            ?.filter(supply =>
              selectedSupplies.includes(supply.value)
            )
            .map(supply => (
              <p key={supply.value}>{supply.label}</p>
            ))
        )}
      </Card>
    </div>
  );
};

export default Create;
