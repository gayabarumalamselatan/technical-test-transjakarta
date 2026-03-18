import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { MapPin, Monitor, Navigation, Truck } from "lucide-react";
import { getStatusLabel } from "../../utils/getStatus";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedVehicle: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSelectedVehicle: (val: any) => void;
}

const DashboardModal = ({ selectedVehicle, setSelectedVehicle }: Props) => {
  const {
    isOpen: isMapOpen,
    onClose: closeMap,
    onOpenChange: toggleMap,
  } = useDisclosure();
  console.log(selectedVehicle);
  return (
    <Modal
      isOpen={!!selectedVehicle}
      placement="top"
      onClose={() => {
        setSelectedVehicle(null);
        closeMap();
      }}
      scrollBehavior="inside"
      size="lg"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="border-b-1 rounded-t-xl border-slate-300 bg-primary text-white">
              Detail Kendaraan
            </ModalHeader>

            <ModalBody className="space-y-4">
              <div className="mt-5">
                <div className="flex gap-2 items-center">
                  <Truck className="w-5 text-primary" />
                  <p className="text-lg font-semibold">Informasi Kendaraan</p>
                </div>
                <div className="grid grid-cols-2 bg-sky-50 p-3 rounded-lg mt-3">
                  <div className="mx-3">
                    <span className="text-xs font-semibold text-muted-foreground">
                      LABEL
                    </span>
                    <p className="text-lg font-bold text-foreground">
                      {selectedVehicle?.label}
                    </p>
                  </div>
                  <div className="mx-3">
                    <span className="text-xs font-semibold text-muted-foreground">
                      ID KENDARAAN
                    </span>
                    <p className="text-lg font-bold text-foreground font-mono break-all">
                      {selectedVehicle?.id}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex gap-2 items-center">
                  <Navigation className="w-5 text-primary" />
                  <p className="text-lg font-semibold">Detail Rute & Trip</p>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-3">
                  <div className="bg-sky-50 p-3 rounded-lg px-5">
                    <span className="text-xs font-semibold text-muted-foreground">
                      RUTE
                    </span>
                    <p className="text-lg font-bold text-foreground">
                      {selectedVehicle?.route?.attributes?.long_name ||
                        selectedVehicle?.routeId}
                    </p>
                  </div>
                  <div className="bg-sky-50 p-3 rounded-lg px-5">
                    <span className="text-xs font-semibold text-muted-foreground">
                      TRIP
                    </span>
                    <p className="text-lg font-bold text-foreground">
                      {selectedVehicle?.tripId}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex gap-2 items-center">
                  <Monitor className="w-5 text-primary" />
                  <p className="text-lg font-semibold">Status</p>
                </div>
                <div className="grid grid-cols-2 bg-sky-50 p-3 rounded-lg mt-3">
                  <div className="mx-3">
                    <span className="text-xs font-semibold text-muted-foreground">
                      STATUS
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <p className="text-lg font-bold text-foreground">
                        {getStatusLabel(selectedVehicle.status)}
                      </p>
                    </div>
                  </div>
                  <div className="mx-3">
                    <span className="text-xs font-semibold text-muted-foreground">
                      PEMBARUAN TERAKHIR
                    </span>
                    <p className="font-bold text-sm mt-1">
                      {new Date(selectedVehicle?.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex gap-2 items-center">
                  <MapPin className="w-5 text-primary" />
                  <p className="text-lg font-semibold">Lokasi GPS</p>
                </div>

                <div
                  className={`bg-sky-50 p-3 rounded-lg mt-3 ${isMapOpen ? "pb-12" : ""}`}
                >
                  <div className="grid grid-cols-2">
                    <div className="mx-3">
                      <span className="text-xs font-semibold text-muted-foreground">
                        LATITUDE
                      </span>
                      <p className="text-lg font-bold text-foreground">
                        {selectedVehicle?.latitude}
                      </p>
                    </div>

                    <div className="mx-3">
                      <span className="text-xs font-semibold text-muted-foreground">
                        LONGITUDE
                      </span>
                      <p className="text-lg font-bold text-foreground">
                        {selectedVehicle?.longitude}
                      </p>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-5"
                    color="primary"
                    onPress={toggleMap}
                  >
                    {isMapOpen ? "Sembunyikan Peta" : "Lihat Detail Lokasi"}
                  </Button>

                  {isMapOpen && (
                    <div className="h-48 rounded-xl mt-5">
                      <p className="mb-2">Posisi Kendaraan:</p>

                      <MapContainer
                        className=""
                        key={selectedVehicle?.id}
                        center={
                          [
                            selectedVehicle.latitude,
                            selectedVehicle.longitude,
                          ] as [number, number]
                        }
                        zoom={13}
                        style={{ height: "100%", width: "100%" }}
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker
                          position={
                            [
                              selectedVehicle.latitude,
                              selectedVehicle.longitude,
                            ] as [number, number]
                          }
                        />
                      </MapContainer>
                    </div>
                  )}
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button onPress={onClose} color="primary">
                Tutup
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DashboardModal;
