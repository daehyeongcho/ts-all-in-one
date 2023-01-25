const sec3Second = async () => {
    const p1 = Promise.resolve(1)
        .then(a => a + 1)
        .then(a => a + 1)
        .then(a => a.toString()); // Promise<string>
    const p2 = Promise.resolve(2); // Promise<number>
    const p3 = new Promise((resolve, reject) => {
        setTimeout(resolve, 1000);
    }); // Promise<unknown>

    // {'0': string, '1', number, '2': unknown, length: 3}
    Promise.all([p1, p2, p3]).then(result => {
        console.log(result);
    });

    // const arr = [p1, p2, p3]
    // keyof arr = '0' | '1' | '2' | 'length'

    abstract class NewPromise<T> {
        abstract then<TResult1 = T, TResult2 = never>(
            onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
            onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
        ): Promise<TResult1 | TResult2>;
    }

    abstract class NewPromiseConstructor {
        abstract all<T extends readonly unknown[] | []>(
            values: T,
        ): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>;
    }

    type NewAwaited<T> = T extends null | undefined
        ? T // special case for `null | undefined` when not in `--strictNullChecks` mode
        : T extends object & { then(onfulfilled: infer F, ...args: infer _): any } // `await` only unwraps object types with a callable `then`. Non-object types are not unwrapped
        ? F extends (value: infer V, ...args: infer _) => any // if the argument to `then` is callable, extracts the first argument
            ? Awaited<V> // recursively unwrap the value
            : never // the argument to `then` was not callable
        : T; // non-object or non-thenable

    type Result = Awaited<{ then(onfullfilled: (v: number) => number): any }>; // thenable
};

sec3Second();
