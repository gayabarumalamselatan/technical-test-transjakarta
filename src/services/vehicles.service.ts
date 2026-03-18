import endpoint from "../constants/endpoint.constant";
import instance from "../utils/instance";

export const vehicleServices = {
  getVehicles: (params?: string) =>
    instance.get(`${endpoint.VEHICLES}?${params}`),
};
