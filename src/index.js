import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reducer, { initialState } from "./context/Reducer";
import Store from "./context/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Store>
            <App />
        </Store>
    </React.StrictMode>
);
