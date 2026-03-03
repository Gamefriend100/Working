import { createContext, useContext, useState, useEffect } from "react";
import { useGetSupplies } from "../../../../hooks/safety/kit";
import { UseAppContext } from "../../../AppContext";

const SuppliesContext = createContext();

export const UseSuppliesContext = () => {
  return useContext(SuppliesContext);
};

export const SuppliesProvider = ({ children }) => {
  const { authUserToken } = UseAppContext();

  const [supplies, setSupplies] = useState();
  const [modalSupplies, setModalSupplies] = useState({ show: false });

  const { supplies: suppliesQuery } = useGetSupplies(authUserToken);
  const { data, isFetching, isSuccess, refetch } = suppliesQuery || {};

  useEffect(() => {
    if (isSuccess) {
      setSupplies(data);
    }
  }, [isSuccess, data]);

  return (
    <SuppliesContext.Provider
      value={{
        supplies,
        isFetching,
        isSuccess,
        setSupplies,
        refetch,
        modalSupplies,
        setModalSupplies,
      }}
    >
      {children}
    </SuppliesContext.Provider>
  );
};
