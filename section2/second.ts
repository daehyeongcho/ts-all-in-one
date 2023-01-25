const sec2Second = () => {
    interface Arr<T> {
        // 우리가 만들어낸 타입
        forEach(callback: (item: T) => void): void;
        // 원본
        // forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;

        // 우리가 만들어낸 타입
        map<S>(callback: (item: T) => S): Arr<S>;
        // 원본
        // map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];

        // 우리가 만들어낸 타입
        filter<S extends T>(callback: (item: T) => item is S): Arr<S>;
        // 원본
        // filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
        // filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];
    }

    const a: Arr<number> = [1, 2, 3];
    a.forEach(item => {
        console.log(item);
        item.toFixed(1);
    });

    a.forEach(item => {
        console.log(item);
        return '3';
    });

    const b: Arr<string> = ['1', '2', '3'];
    b.forEach(item => {
        console.log(item);
        item.charAt(3);
    });

    b.forEach(item => {
        console.log(item);
        return '3';
    });

    const c: Arr<string | number> = [1, '2', 3, '4', 5];
    c.forEach(item => {
        console.log(item);
    });

    const a1 = a.map(v => v + 1);
    const a2 = a.map(v => v.toString());
    const a3 = a.map(v => v % 2 === 0);

    const d: Arr<string> = ['1', '2', '3'];
    const d1 = d.map(v => +v);

    const a4 = a.filter((v): v is number => v % 2 === 0);
    const c1 = c.filter((v): v is string => typeof v === 'string');
    const c2 = c.filter((v): v is number => typeof v === 'number');

    const g = [1, 2, '3'];
    const g1 = g.filter((v): v is string => typeof v === 'string');
};
