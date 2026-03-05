import { useState } from "react";
import { Button, MUIAutocomplete, notifyError, notifySuccess } from "../../../../components/shared";
import { UseKitContext } from "../../../../context/safety/kit/KitContext";
import { UseRequestContext } from "../../../../context/safety/kit/request/RequestContext";
import { UseAppContext } from "../../../../context/AppContext";
import { AddCircle } from "@mui/icons-material";
import { appApi } from "../../../../api";

const Form = () => {
  const { supplies } = UseKitContext();
  const { requests, setRequests, setModalRequest } = UseRequestContext();
  const { authUserToken } = UseAppContext();


  const [selectedSupply, setSelectedSupply] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newRequest = {
        supplyId: selectedSupply
      };
      const { data } = await appApi.post("/intranet/supplies/request/create", newRequest,
        { headers: { Authorization: `Bearer ${authUserToken}` } }
      );
      notifySuccess(data.msg);
      setRequests([
        { ...data.request, supplyId: selectedSupply },
        ...requests
      ]);

    } catch (error) {
      notifyError(error?.response?.data?.msg || "Error al crear la solicitud");
    } finally {
      setModalRequest({ show: false });
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="font-semibold text-lg">
        Selecciona el insumo que deseas solicitar:
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <MUIAutocomplete
          required
          title="Insumos"
          options={supplies?.filter(
            (s) => !requests.some((r) => r.supplyId === s.value)) ?? []}
          value={selectedSupply}
          handleChange={({ value }) => setSelectedSupply(value)}
        />

        <Button
          text="Agregar"
          icon={<AddCircle fontSize="small" />}
          disabled={!selectedSupply}
          type="submit"
        />
      </form>
    </div>
  );
};

export default Form;
