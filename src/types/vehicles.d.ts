export interface Vehicle {
  id: string;
  label: string;
  latitude: number;
  longitude: number;
  status: string;
  routeId: string;
  tripId: string;
  updatedAt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  route?: any;
}
