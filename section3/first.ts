const sec3First = () => {
    interface Profile {
        name: string;
        age: number;
        married?: boolean;
    }

    const randy: Profile = {
        name: 'randy',
        age: 32,
        married: false,
    };

    // Partial: 전부 optional로 바꿔줌
    // const newRandy: Partial<Profile> = { name: 'randy', age: 29 };

    // Partial 직접 구현
    type NewPartial<T> = {
        [key in keyof T]?: T[key];
    };

    // 사실 비추천. 모든 걸 optional로 만들기 때문에
    const randyPartial: NewPartial<Profile> = { name: 'randy', age: 32 };

    // 특정 property만 고름
    const randyPick: Pick<Profile, 'age' | 'name'> = { name: 'randy', age: 32 };
    // 특정 property만 제외
    // const randyOmit: Omit<Profile, 'married'> = { name: 'randy', age: 32 };

    type NewPick<T, S extends keyof T> = {
        [key in S]: T[key];
    };

    const randyNewPick: NewPick<Profile, 'age' | 'name'> = { name: 'randy', age: 32 };

    // extend: 확장이라는 뜻이지만 사실 타입을 '좁히는' 것이다. (subtype)
    // interface일 때: 새로운 property를 추가해서 타입을 좁힘
    // union type일 때: 여러 선택지 중 하나를 선택해서 타입을 좁힘
    // T가 Union type이면 T extends S는 T 내부를 돌면서 S의 부분집합인지 검사함
    type NewExclude<T, S> = T extends S ? never : T;
    type NewExtract<T, S> = T extends S ? T : never;
    type NewOmit<T, S extends keyof any> = {
        [key in NewExclude<keyof T, S>]: T[key];
    };

    const randyNewOmit: NewOmit<Profile, 'married'> = { name: 'randy', age: 32 };

    type NewRequired<T> = {
        [key in keyof T]-?: T[key]; // 물음표 떼고 가져옴
    };

    const randyNewRequired: NewRequired<Profile> = { name: 'randy', age: 32, married: true };

    type NewReadOnly<T> = {
        readonly [key in keyof T]: T[key];
        // -readonly [key in keyof T]: T[key]; // readonly 뗄 수도 있음
    };
    const randyNewReadOnly: NewReadOnly<Profile> = { name: 'randy', age: 32 };
    // randyNewReadOnly.name = 'randy2'; // 에러

    type NewRecord<T extends keyof any, S> = {
        [key in T]: S;
    };
    const rec: NewRecord<string, number> = { a: 1, b: 2, c: 3 };

    type NewNonNullable<T> = T extends null | undefined ? never : T;
    type A = string | null | undefined | boolean | number;
    type B = NewNonNullable<A>;

    function zip(x: number, y: string, z: boolean): { x: number; y: string; z: boolean } {
        return { x, y, z };
    }

    // infer: extends에서만 사용 가능
    // infer: 추론에 성공하면 A, 실패하면 never
    type NewParameters<T extends (...args: any) => any> = T extends (...args: infer A) => any ? A : never;
    type NewReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer A ? A : never;

    // abstract 붙이면 abstract class, class 둘 다 쓸 수 있음.
    type NewConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (
        ...args: infer A
    ) => any
        ? A
        : never;
    type NewInstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer A ? A : never;

    class Example {
        a: string;
        b: number;
        c: boolean;

        constructor(a: string, b: number, c: boolean) {
            this.a = a;
            this.b = b;
            this.c = c;
        }
    }

    const example = new Example('123', 456, true);
    type ExampleNewConstructorParameters = NewConstructorParameters<typeof Example>;
    type ExampleNewInstanceType = NewInstanceType<typeof Example>;

    // class명: 인스턴스의 타입
    const example2: Example = new Example('123', 456, true);

    // 타입으로는 구현이 안돼서 intrinsic;으로 되어있음. (javascript)
    type Hello = 'Hello World';
    type HelloLower = Lowercase<Hello>;
    type HelloUpper = Uppercase<Hello>;
};
