import { createContext, useContext, useState } from "react";
import { useGetRequest } from "../../../../hooks/safety/kit";
import { UseAppContext } from "../../../AppContext";

const RequestContext = createContext();

export const UseRequestContext = () => {
  return useContext(RequestContext);
};

export const RequestProvider = ({ children }) => {
  const { authUserToken } = UseAppContext();
  const { data, isFetching } = useGetRequest(authUserToken).request;

  const [modalRequest, setModalRequest] = useState({ show: false });

  // 🔥 NUEVO ESTADO GLOBAL
  const [selectedSupplies, setSelectedSupplies] = useState([]);

  // 🔥 función para agregar insumo
  const addSupply = (supplyId) => {
    setSelectedSupplies(prev => [...prev, supplyId]);
  };

  return (
    <RequestContext.Provider
      value={{
        data,
        isFetching,
        modalRequest,
        setModalRequest,
        selectedSupplies,   // 👈 exportamos
        addSupply           // 👈 exportamos
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};
