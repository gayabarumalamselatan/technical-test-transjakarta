import { useQuery } from "@tanstack/react-query";
import type { Vehicle } from "../../types/vehicles";
import { vehicleServices } from "../../services/vehicles.service";

const fetchVehicles = async (
  page: number,
  limit: number = 6,
  routes: string[],
  trips: string[],
) => {
  const offset = (page - 1) * limit;
  const params = new URLSearchParams();
  params.append("page[offset]", String(offset));
  params.append("page[limit]", String(limit));
  if (routes.length) {
    params.append("filter[route]", routes.join(","));
  }

  if (trips.length) {
    params.append("filter[trip]", trips.join(","));
  }

  const res = await vehicleServices.getVehicles(params.toString());

  if (res.status !== 200) throw new Error("Failed fetch");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vehicles: Vehicle[] = res.data.data.map((item: any) => ({
    id: item.id,
    label: item.attributes.label,
    latitude: item.attributes.latitude,
    longitude: item.attributes.longitude,
    status: item.attributes.current_status,
    routeId: item.relationships.route.data.id,
    tripId: item.relationships.trip.data.id,
    updatedAt: item.attributes.updated_at,
  }));

  let total = offset + vehicles.length;

  if (res.data.links?.last) {
    const url = new URL(res.data.links.last);
    const lastOffset = Number(url.searchParams.get("page[offset]") || 0);
    total = lastOffset + limit;
  }

  return {
    vehicles,
    total,
  };
};

export const useDashboard = (
  page: number,
  limit: number,
  routes: string[],
  trips: string[],
) => {
  return useQuery({
    queryKey: ["vehicles", page, limit, routes, trips],
    queryFn: () => fetchVehicles(page, limit, routes, trips),
  });
};
