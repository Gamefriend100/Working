import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../../accions";

export const useGetSupplies = (token) => {
  const supplies = useQuery({
    queryKey: ["supplies"],
    queryFn: () => fetchData("supplies", token),
    refetchOnWindowFocus: false,
    enabled: !!token,
  });
  return {
    supplies,
  };
};

export const useGetCategorySupplies = (token) => {
  const categories = useQuery({
    queryKey: ["categorySupplies"],
    queryFn: () => fetchData("supplies/category", token),
    refetchOnWindowFocus: false,
    enabled: !!token,
  });

  return {
    categories,
  };
};

export const useGetKit = (branchId, token) => {
  const kit = useQuery({
    queryKey: ["kits", branchId],
    queryFn: () => fetchData(`supplies/kit/${branchId}`, token),
    refetchOnWindowFocus: false,
    enabled: !!token && !!branchId
  })

  return {
    kit
  }
}

export const useGetRequest = (token) => {
  const request = useQuery({
    queryKey: ["request"],
    queryFn: () => fetchData("supplies/request", token),
    refetchOnWindowFocus: false,
    enabled: !!token
  })
  return {
    request
  }
}

