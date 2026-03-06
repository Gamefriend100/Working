import { useState } from "react";
import { Button, MUIAutocomplete } from "../../../../components/shared";
import { UseKitContext } from "../../../../context/safety/kit/KitContext";
import { UseRequestContext } from "../../../../context/safety/kit/request/RequestContext";
import { AddCircle } from "@mui/icons-material";

const Form = () => {
  const { supplies } = UseKitContext();
  const { selectedSupplies, addSupply, setModalRequest } = UseRequestContext();

  const [selectedSupply, setSelectedSupply] = useState(null);

  return (
    <div className="p-8 space-y-6">
      <h1>Selecciona el insumo que deseas solicitar:</h1>

      <MUIAutocomplete
        required
        title="Insumos"
        options={
          supplies?.filter(
            supply => !selectedSupplies.includes(supply.value)
          ) ?? []
        }
        value={selectedSupply}
        handleChange={({ value }) => setSelectedSupply(value)}
      />

      <Button
        text="Agregar"
        icon={<AddCircle fontSize="small" />}
        disabled={!selectedSupply}
        action={() => {
          addSupply(selectedSupply);   // 🔥 guardamos en contexto
          setModalRequest({ show: false }); // opcional cerrar modal
        }}
      />
    </div>
  );
};

export default Form;
