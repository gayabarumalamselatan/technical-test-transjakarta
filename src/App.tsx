import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page from "./layout/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loading from "./components/ui/loading";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Page />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
