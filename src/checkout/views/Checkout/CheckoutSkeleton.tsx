import { CheckoutFormSkeleton } from "@/checkout/sections/CheckoutForm";
import { SummarySkeleton } from "@/checkout/sections/Summary";

export const CheckoutSkeleton = () => (
	<div className="min-h-screen px-4 lg:px-0 dark:bg-bgDark bg-white">
		<div className="grid grid-cols-1 gap-x-16 lg:grid-cols-2 dark:bg-bgDark bg-white">
			<CheckoutFormSkeleton />
			<div className="h-6 w-full lg:h-full lg:w-5 dark:bg-bgDark bg-white" />
			<SummarySkeleton />
		</div>
	</div>
);
