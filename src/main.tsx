import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { Provider } from "react-redux";
import { appStore } from "./store.ts";
import { Toaster } from "./components/ui/sonner.tsx";
import { useLoadUserQuery } from "./features/api/authApi.ts";
import LoadingSpinner from "./components/LoadingSpinner.tsx";

const Custom = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useLoadUserQuery();
  return <> {isLoading ? <LoadingSpinner /> : <>{children}</>} </>;
};

createRoot(document.getElementById("root")!).render(
  // <BrowserRouter>
  <ThemeProvider>
    <Provider store={appStore}>
      <Custom>
        <App />
        <Toaster />
      </Custom>
    </Provider>
  </ThemeProvider>
  // </BrowserRouter>
);
