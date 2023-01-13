import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./components/App";

const rootElement = document.getElementById("root");
if (!rootElement) {
	throw new Error("Could not get root element");
}

const root = createRoot(rootElement);
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
