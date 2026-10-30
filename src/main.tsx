import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/MainRoutes.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          toastOptions={{
            success: { duration: 3000, style: { background: "#00ccb1", color: "#fff" } },
            error: { duration: 4000, style: { background: "#ff4b4b", color: "#fff" } },
          }}
        />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
