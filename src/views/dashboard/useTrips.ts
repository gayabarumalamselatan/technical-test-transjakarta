import { useQuery } from "@tanstack/react-query";
import { tripServices } from "../../services/trip.service";

const fetchTrips = async (routes: string[]) => {
  const params = new URLSearchParams();

  params.append("filter[route]", routes.join(","));

  const res = await tripServices.getTrips(params.toString());

  return {
    data: res.data.data,
  };
};

export const useTrips = (routes: string[]) => {
  return useQuery({
    queryKey: ["trips", routes],
    enabled: routes.length > 0,
    queryFn: async () => fetchTrips(routes),
  });
};
