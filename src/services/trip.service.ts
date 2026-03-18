import endpoint from "../constants/endpoint.constant";
import instance from "../utils/instance";

export const tripServices = {
  getTrips: (params?: string) =>
    instance.get(params ? `${endpoint.TRIP}?${params}` : endpoint.TRIP),
};
