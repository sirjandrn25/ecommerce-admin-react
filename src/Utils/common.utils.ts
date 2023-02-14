export const EmptyFunction = () => {
	//empty function
};

export const resolveNavigation = (path: string) => {
	return `/admin/${path}`;
};

export const Debounce = (func: () => void, wait: number) => {
	let interval: any;
	return (...args: any) => {
		const context = this;
		clearTimeout(interval);
		interval = setTimeout(() => {
			func.apply(context, args);
		}, wait);
	};
};
