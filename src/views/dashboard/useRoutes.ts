import { useQuery } from "@tanstack/react-query";
import { routeServices } from "../../services/route.service";

const fetchRoutes = async () => {
  const res = await routeServices.getRoutes();

  if (res.status !== 200) throw new Error("Failed fetch routes");

  return {
    data: res.data.data,
  };
};

export const useRoutes = () => {
  return useQuery({
    queryKey: ["routes"],
    queryFn: () => fetchRoutes(),
  });
};
