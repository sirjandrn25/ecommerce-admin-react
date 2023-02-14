export const EmptyFunction = () => {
	//empty function
};

export const resolveNavigation = (path: string) => {
	return `/admin/${path}`;
};

export const Debounce = (func: (value?: any) => void, wait: number) => {
	let timer: any;
	return (...args: any) => {
		const context = this;
		clearTimeout(timer);

		timer = setTimeout(() => {
			console.log(args);
			func.apply(context, args);
		}, wait);
	};
};
