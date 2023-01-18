class SlidingPane {
	globalState: any = null;
	static register(ref: any) {
		(this as any).globalState = ref;
	}
	static open(args: any) {
		(this as any).globalState?.open({ ...args });
	}

	static close(args: any) {
		(this as any).globalState?.close({ ...args });
	}
}

export default SlidingPane;
