import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FunctionComponent } from "react";

import { Grid } from "./Grid";

import css from "./App.module.css";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

export const App: FunctionComponent = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<div className={css.app}>
				<Grid />
			</div>
		</QueryClientProvider>
	);
};
