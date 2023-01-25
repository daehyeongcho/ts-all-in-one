const sec2First = () => {
    interface Array<T> {
        forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
        // S는 T의 부분집합
        every<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): this is S[];

        map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];

        filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];

        filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];
    }

    // item 타입추론
    [1, 2, 3].forEach(item => {
        console.log(item);
    });
    ['1', '2', '3'].forEach(item => {
        console.log(item);
    });
    [true, false, true].forEach(item => {
        console.log(item);
    });
    ['123', 123, true].forEach(item => {
        console.log(item);
    });

    // map<string>(callbackfn: (value: number, index: number, array: number[]) => string, thisArg?: any): string[]
    const strings = [1, 2, 3].map(item => item.toString());

    const filtered = [1, 2, 3, 4, 5].filter(value => value % 2);

    // type이 string | number[]로 나온다.
    const filtered2 = ['1', 2, '3', 4, '5'].filter(value => typeof value === 'string'); // ['1','3','5']

    // type이 string[]으로 제대로 추론
    const filtered3 = ['1', 2, '3', 4, '5'].filter((value): value is string => typeof value === 'string');

    // predicate 부분이 커스텀 타입 가드(A is B)가 아니여서 안된다.
    // const filtered4 = ['1', 2, '3', 4, '5'].filter<string>(value => typeof value === 'string');
};
