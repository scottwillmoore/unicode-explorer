import { UserConfig } from "vite";

import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";

export default {
	plugins: [legacy(), react()],
} satisfies UserConfig;
