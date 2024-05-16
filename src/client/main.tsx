import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom'
import App from "./App";
import { BaseStoreProvider } from "@c/stores";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    // <React.StrictMode>
        <BrowserRouter>
            <BaseStoreProvider>
                <App />
            </BaseStoreProvider>
        </BrowserRouter>
    // </React.StrictMode>,
);
