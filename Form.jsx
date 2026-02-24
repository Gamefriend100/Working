import { Button, MUIAutocomplete, notifyError, notifySuccess, TextFieldError } from "../../../../components/shared";
import { useGetCategorySupplies } from "../../../../hooks/safety/kit";
import { UseAppContext } from "../../../../context/AppContext";
import { TaskAlt } from "@mui/icons-material";
import { useState } from "react";
import { appApi } from "../../../../api";
import { UseSuppliesContext } from "../../../../context/safety/kit/supplies/SuppliesContext";

const Form = ({ item }) => {
  const { authUserToken } = UseAppContext();
   const { setModalSupplies, supplies } = UseSuppliesContext();

  const [identifier, setIdentifier] = useState(item?.identifier || "");
  const [name, setName] = useState(item?.name || "");
  const [specification, setSpecification] = useState(item?.specification || "");
  const [category, setCategory] = useState(item?.categoryId || null);

  const { data, isFetching } = useGetCategorySupplies(authUserToken).categories;

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

    const {data} = await appApi[method](url, newData,{
      headers: {
          Authorization: `Bearer ${authUserToken}`,
        },
    });
    notifySuccess(data.msg)

  } catch (error) {
    notifyError(error?.response?.data?.msg || "Algo salio mal, intenta de nuevo")
  } finally {
    setModalSupplies({show:false});
  }
};

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
            onChange={(e) => {
              setIdentifier(e.target.value);
            }}
          />

          <div className="col-span-2">
            <TextFieldError
              required
              name="name"
              label="Nombre"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
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

        {!isFetching && (
          <MUIAutocomplete
            required
            title={"Categoría"}
            options={data}
            value={category}
            handleChange={({ value }) => setCategory(value)}
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
