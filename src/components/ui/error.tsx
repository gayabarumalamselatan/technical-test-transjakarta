import { Button } from "@heroui/react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

type ErrorStateProps = {
  error: unknown;
  onRetry?: () => void;
};

const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  const status =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error as any)?.status || (error as any)?.response?.status || null;

  const message =
    status === 429
      ? "Terlalu banyak permintaan ke server."
      : "Terjadi kesalahan saat memuat data.";

  const description =
    status === 429
      ? "Silakan tunggu beberapa saat sebelum mencoba lagi."
      : "Periksa koneksi internet atau coba refresh halaman.";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="bg-red-50 border border-red-100 p-6 rounded-2xl max-w-md w-full shadow-sm">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertTriangle className="text-red-500 w-6 h-6" />
          </div>
        </div>

        <h1 className="text-xl font-semibold text-red-600">
          Error {status || ""}
        </h1>

        <p className="mt-2 text-sm text-foreground">{message}</p>

        <p className="mt-1 text-xs text-muted-foreground">{description}</p>

        <Button
          className="mt-5 w-full"
          color="danger"
          onPress={onRetry}
          startContent={<RefreshCcw size={16} />}
        >
          Coba Lagi
        </Button>
      </div>
    </div>
  );
};

export default ErrorState;
