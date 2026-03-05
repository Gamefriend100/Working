import { createContext, useContext, useState, useEffect } from "react";
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
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (data) {
      setRequests(data);
    }
  }, [data]);

  return (
    <RequestContext.Provider
      value={{
        data,
        requests,
        setRequests,
        isFetching,
        modalRequest,
        setModalRequest,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};
