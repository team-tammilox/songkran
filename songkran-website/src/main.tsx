import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import SongkranLanding from "./SongkranLanding";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <SongkranLanding />
  </HelmetProvider>
);