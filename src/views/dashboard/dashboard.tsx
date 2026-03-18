import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Pagination,
  Select,
  SelectItem,
} from "@heroui/react";
import { Clock, MapPin } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { useDashboard } from "./useDashboard";
import { useMemo, useState } from "react";
import { useRoutes } from "./useRoutes";
import { useTrips } from "./useTrips";
import SkeletonCard from "../../components/ui/skeleton";
import DashboardModal from "./dashboardModal";
import type { Vehicle } from "../../types/vehicles";
import { getStatusLabel } from "../../utils/getStatus";
import Error from "../../components/ui/error";

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);
  const [selectedTrips, setSelectedTrips] = useState<string[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const { data, isLoading, error } = useDashboard(
    page,
    limit,
    selectedRoutes,
    selectedTrips,
  );
  const routesQuery = useRoutes();
  const tripsQuery = useTrips(selectedRoutes);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const routeOptions = routesQuery.data?.data || [];
  const tripOptions = tripsQuery.data?.data || [];

  const routeMap = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Object.fromEntries(routeOptions.map((r: any) => [r.id, r]));
  }, [routeOptions]);

  const totalData = data?.total || 0;
  const totalPage = Math.ceil(totalData / limit);

  const start = (page - 1) * limit + 1;
  const end = start + (data?.vehicles.length || 0) - 1;

  if (error)
    return <Error error={error} onRetry={() => window.location.reload()} />;
  console.log("selec", selectedRoutes);

  return (
    <Fragment>
      {/* filter */}
      <section className="mx-4 md:mx-10 lg:mx-20 mt-10">
        <Card className="px-4 py-5 rounded-3xl">
          <CardHeader className="font-semibold flex justify-between text-foreground text-xl">
            Filter
            {selectedRoutes.length > 0 || selectedTrips.length > 0 ? (
              <Button
                variant="flat"
                color="danger"
                onPress={() => {
                  setSelectedRoutes([]);
                  setSelectedTrips([]);
                }}
              >
                Reset
              </Button>
            ) : (
              <></>
            )}
          </CardHeader>
          <CardBody className="flex xl:flex-row flex-col gap-4">
            <Select
              label="Rute"
              selectionMode="multiple"
              selectedKeys={selectedRoutes}
              onSelectionChange={(keys) =>
                setSelectedRoutes(Array.from(keys) as string[])
              }
            >
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                routeOptions.map((route: any) => (
                  <SelectItem key={route.id}>
                    {route.attributes.long_name}
                  </SelectItem>
                ))
              }
            </Select>
            <Select
              label="Trip"
              selectionMode="multiple"
              isDisabled={selectedRoutes.length === 0}
              placeholder={
                selectedRoutes.length === 0
                  ? "Pilih rute terlebih dahulu"
                  : "Pilih trip"
              }
              selectedKeys={selectedTrips}
              onSelectionChange={(keys) =>
                setSelectedTrips(Array.from(keys) as string[])
              }
            >
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                tripOptions.map((trip: any) => (
                  <SelectItem key={trip.id}>{trip.id}</SelectItem>
                ))
              }
            </Select>
          </CardBody>
        </Card>
      </section>

      {/* grid */}
      <section className="mx-4 md:mx-10 lg:mx-20 mt-10">
        {/* header */}
        <div className="flex items-center justify-between mb-10">
          <div className="w-full">
            <h1 className="font-semibold text-2xl">Data Kendaraan</h1>
            <p>Menampilkan </p>
          </div>
          <div className="flex items-center gap-4 w-full text-end justify-end">
            <p>Jumlah data per halaman:</p>
            <Select
              defaultSelectedKeys={["6"]}
              className="max-w-20"
              onSelectionChange={(keys) => {
                const value = Number(Array.from(keys)[0]);
                setLimit(value);
                setPage(1);
              }}
            >
              <SelectItem key={"6"}>6</SelectItem>
              <SelectItem key={"12"}>12</SelectItem>
              <SelectItem key={"24"}>24</SelectItem>
            </Select>
          </div>
        </div>

        {/* list */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: limit }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : data?.vehicles.map((v) => (
                <div
                  key={v.id}
                  onClick={() => {
                    setSelectedVehicle({
                      ...v,
                      route: routeMap[v.routeId],
                    });
                  }}
                  className="hover:cursor-pointer"
                >
                  <Card>
                    <CardHeader className="flex items-start justify-between gap-4 p-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {v.label}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          ID: {v.id}
                        </p>
                      </div>
                      <div
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold bg-sky-100`}
                      >
                        {getStatusLabel(v.status)}
                      </div>
                    </CardHeader>
                    <CardBody className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Rute
                          </p>
                          <p className="text-sm font-semibold text-foreground truncate">
                            {routeMap[v.routeId]?.attributes?.long_name ||
                              v.routeId}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Trip
                          </p>
                          <p className="text-sm font-semibold text-foreground truncate">
                            {v.tripId}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-2.5 mt-4 bg-slate-50 border border-slate-100 rounded-lg">
                        <div className="p-1.5 bg-white rounded-md shadow-sm">
                          <MapPin className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-muted-foreground font-medium">
                            Koordinat Kendaraan
                          </p>
                          <p className="text-[11px] font-mono text-slate-600 truncate">
                            {v.latitude}, {v.longitude}
                          </p>
                        </div>
                      </div>
                    </CardBody>
                    <CardFooter className="flex items-center gap-2 p-4 pt-3 border-t border-slate-100 bg-slate-50/50">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      <p className="text-[11px] text-muted-foreground">
                        Pembaruan terakhir:{" "}
                        {new Date(v.updatedAt).toLocaleString()}
                      </p>
                    </CardFooter>
                  </Card>
                </div>
              ))}
        </div>
      </section>

      {/* pagination */}
      <section className="mx-4 md:mx-10 lg:mx-20 border-t-2 border-slate-400 mt-10 pt-5 flex justify-between">
        <p>
          Menampilkan {start}-{end} dari {totalData} data
        </p>

        <Pagination
          isCompact
          page={page}
          total={totalPage}
          showControls
          onChange={(p) => setPage(p)}
        />
      </section>
      <DashboardModal
        selectedVehicle={selectedVehicle}
        setSelectedVehicle={setSelectedVehicle}
      />
    </Fragment>
  );
};

export default Dashboard;
