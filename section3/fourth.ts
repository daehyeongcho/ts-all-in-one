const sec3Fourth = () => {
    // flat<A, D extends number = 1>(
    //     this: A,
    //     depth?: D
    // ): FlatArray<A, D>[]

    const a = [1, 2, 3, [1, 2], [[1], [2]]].flat(); // [1, 2, 3, 1, 2, [1], [2]]
    const b = [1, 2, 3, [1, 2]].flat();
    const c = [1, 2, 3, [1, 2], [[1], [2]]].flat(2);

    type A = {
        name: string;
        age: number;
    };
    type B = A[1 extends number ? 'age' : 'name'];

    // type C = 3 - 1; // 이런게 안됨
    // type적으로 1을 빼주는 걸 어떻게 구현했을까?
    // [-1, 0, 1, 2, 3, 4, ...][Depth] 이렇게 구현해버림;;
};

sec3Fourth();
