import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store/index";
import { loginSuccess } from "./store/authSlice.jsx";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        // onBeforeLift={() => {
        //   const raw = window.localStorage.getItem("persist:rememberMe");
        //   console.log(
        //     "[PersistGate] onBeforeLift - remember flag (string):",
        //     raw
        //   );
        //   const remember = raw === "true";
        //   if (!remember) {
        //     console.log("[PersistGate] purging auth because remember=false");
        //     persistor.purge();
        //   } else {
        //     const { token } = store.getState().auth;
        //     if (token) {
        //       store.dispatch(loginSuccess({ token }));
        //     }
        //   }
        // }}
      >
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
