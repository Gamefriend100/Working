import { Button, MUIAutocomplete, notifyError, notifySuccess, TextFieldError } from "../../../../components/shared";
import { UseAppContext } from "../../../../context/AppContext";
import { TaskAlt } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { appApi } from "../../../../api";
import { UseSuppliesContext } from "../../../../context/safety/kit/supplies/SuppliesContext";
import NotificationStructure from "../../../../components/shared/NotificationStructure";
import { UseKitContext } from "../../../../context/safety/kit/KitContext";

const Form = ({ item, mode }) => {
  const { authUserToken } = UseAppContext();
  const { setModalSupplies, supplies, setSupplies } = UseSuppliesContext();
  const { categories, isFechingCategories } = UseKitContext();

  const [identifier, setIdentifier] = useState(item?.identifier || "");
  const [name, setName] = useState(item?.name || "");
  const [specification, setSpecification] = useState(item?.specification || "");
  const [category, setCategory] = useState(item?.categoryId || null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = item ? "put" : "post";
      const url = item
        ? `/intranet/supplies/edit/${item.id}`
        : "/intranet/supplies/create";

      const newData = {
        identifier,
        name,
        specification,
        categoryId: category,
      };

      const { data } = await appApi[method](url, newData, {
        headers: { Authorization: `Bearer ${authUserToken}` },
      });

      notifySuccess(data.msg);

      const newLocalData = item
        ? supplies.map((s) => (s.id === item.id ? data.supply : s))
        : [data.supply, ...supplies];

      setSupplies(newLocalData);
    } catch (error) {
      notifyError(
        error?.response?.data?.msg || "Algo salió mal, intenta de nuevo"
      );
    } finally {
      setModalSupplies({ show: false });
    }
  };

  const handleDelete = async () => {
    try {
      await appApi.delete(`/intranet/supplies/delete/${item.id}`, {
        headers: { Authorization: `Bearer ${authUserToken}` },
      });

      setSupplies(supplies.filter((s) => s.id !== item.id));

      notifySuccess("Insumo eliminado correctamente");
    } catch (error) {
      notifyError(
        error?.response?.data?.msg || "Error al eliminar el insumo"
      );
    } finally {
      setModalSupplies({ show: false });
    }
  };

  useEffect(() => {
    if (mode === "delete" && item) {
      setModalSupplies({
        show: true,
        children: (
          <NotificationStructure
            title="Eliminar insumo"
            action={handleDelete}
            onCancel={() => setModalSupplies({ show: false })}
          >
            <p>Estas apunto de eliminar el siguiente insumo:</p>
            <p className="font-semibold">{item.name}</p>
            <p>¿Deseas continuar con esta acción?</p>
          </NotificationStructure>
        ),
      });
    }
  }, []);

  if (mode === "delete") return null;

  return (
    <div className="p-8 space-y-6">
      <p className="uppercase font-semibold text-xl border-b pb-1">
        {item ? "Editar" : "Agregar"} insumo
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4">
          <TextFieldError
            required
            name="identifier"
            label="Identificador"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <div className="col-span-2">
            <TextFieldError
              required
              name="name"
              label="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <TextFieldError
          required
          name="specification"
          label="Presentación"
          value={specification}
          onChange={(e) => setSpecification(e.target.value)}
        />

        {!isFechingCategories && (
          <MUIAutocomplete
            required
            title="Categoría"
            options={categories?.data ?? []}
            value={category}
            handleChange={({ value }) => setCategory(value)} // <-- CORREGIDO
          />
        )}

        <Button
          text="Guardar"
          icon={<TaskAlt fontSize="small" />}
          type="submit"
        />
      </form>
    </div>
  );
};

export default Form;
