declare namespace uvu {
	type Crumbs = { __suite__: string; __test__: string };
	type Callback<T> = (context: T & Crumbs) => Promise<void> | void;

	interface Hook<T> {
		(hook: Callback<T>): void;
		each(hook: Callback<T>): void;
	}

	interface InternalTest {
		name: string;
    	handler: (state: Record<string, any>) => Promise<void>;
	}

	interface Test<T> {
		(name: string, test: Callback<T>): void;
		only(name: string, test: Callback<T>): void;
		skip(name?: string, test?: Callback<T>): void;
		before: Hook<T>;
		after: Hook<T>
		run(): void;

		ctx: {
			state: Record<string, any> & uvu.Crumbs;
			tests: InternalTest[];
    	};

		// Methods for the suite
		getName(): string;
		getTests(): InternalTest[];
		getOnlys(): InternalTest[];
	}
}

type Context = Record<string, any>;

export type Test<T = Context> = uvu.Test<T>;
export type Callback<T = Context> = uvu.Callback<T>;

export const silence: () => void;

export const test: uvu.Test<Context>;
export function suite<T = Context>(title?: string, context?: T): uvu.Test<T>;
export function exec(bail?: boolean): Promise<void>;

