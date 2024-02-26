"use client";
import { PageNotFound } from "@/checkout/views/PageNotFound"; // Move the import here
import { useAuthChange, useSaleorAuthContext } from "@saleor/auth-sdk/react";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer } from "react-toastify";
import {
	Provider as UrqlProvider,
	cacheExchange,
	createClient,
	dedupExchange,
	fetchExchange,
	type Client,
} from "urql";
import { alertsContainerProps } from "./hooks/useAlerts/consts";
import "./index.css";
import { RootViews } from "./views/RootViews";

export const Root = ({ saleorApiUrl }: { saleorApiUrl: string }) => {
	const saleorAuthClient = useSaleorAuthContext();

	const makeUrqlClient = () =>
		createClient({
			url: saleorApiUrl,
			suspense: true,
			requestPolicy: "cache-first",
			fetch: (input, init) => saleorAuthClient.fetchWithAuth(input as NodeJS.fetch.RequestInfo, init),
			exchanges: [dedupExchange, cacheExchange, fetchExchange],
		});

	const [urqlClient, setUrqlClient] = useState<Client>(makeUrqlClient());
	useAuthChange({
		saleorApiUrl,
		onSignedOut: () => setUrqlClient(makeUrqlClient()),
		onSignedIn: () => setUrqlClient(makeUrqlClient()),
	});

	return (
		<UrqlProvider value={urqlClient}>
			<ToastContainer {...alertsContainerProps} />
			<ErrorBoundary FallbackComponent={PageNotFound}>
				<RootViews />
			</ErrorBoundary>
		</UrqlProvider>

	);
};
