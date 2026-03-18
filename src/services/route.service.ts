import endpoint from "../constants/endpoint.constant";
import instance from "../utils/instance";

export const routeServices = {
  getRoutes: (params?: string) =>
    instance.get(params ? `${endpoint.ROUTE}?${params}` : endpoint.ROUTE),
};
