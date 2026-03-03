import { createContext, useContext } from "react";
import {
  useGetCategorySupplies,
  useGetSupplies,
} from "../../../hooks/safety/kit";
import { UseAppContext } from "../../AppContext";

const KitContext = createContext();

export const UseKitContext = () => {
  return useContext(KitContext);
};

export const KitProvider = ({ children }) => {
  const { authUserToken } = UseAppContext();


  const {
    data: initCategories,
    isFetching: isFechingCategories,
    isSuccess: isSuccesCategories,
  } = useGetCategorySupplies(authUserToken).categories;


  const {
    data: initSupplies,
    isFetching: isFechingSupplies,
    isSuccess: isSuccessSupplies,
  } = useGetSupplies(authUserToken).supplies;

  return (
    <KitContext.Provider
      value={{
        initCategories,
        isFechingCategories,
        isSuccesCategories,
        initSupplies,
        isFechingSupplies,
        isSuccessSupplies,
      }}
    >
      {children}
    </KitContext.Provider>
  );
};
