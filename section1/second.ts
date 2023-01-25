const second = () => {
    // enum
    const enum EDirection {
        Up = 3,
        Down,
        Left,
        Right,
    } // js에선 사라짐
    // object
    const ODirection = {
        Up: 3,
        Down: 4,
        Left: 5,
        Right: 6,
    }; // js에서 남아있음
    // object as const
    const ODirectionConst = {
        Up: 3,
        Down: 4,
        Left: 5,
        Right: 6,
    } as const;

    const up = EDirection.Up; // 3
    const down = EDirection.Down; // 4
    function walk(dir: EDirection) {}

    type Key = keyof typeof ODirectionConst;
    type Direction = typeof ODirectionConst[keyof typeof ODirectionConst];
    function run(dir: Direction) {}

    walk(EDirection.Up);
    run(ODirectionConst.Right);

    // alias
    type A = { a: string };
    const a: A = { a: 'hello' };

    interface B {
        a: string;
    }
    const b: B = { a: 'hello' };

    function add(x: string | number, y: string | number) {
        return `${x} + ${y}`;
    }

    const result = add(1, 2);

    add('1', '2');
    add(1, '2');

    type C = string & boolean; // never
    // const c: C = 1 // error
    type D = { hello: 'world' } & { zero: 'cho' }; // 모든 속성이 다 있어야 함(intersection)
    const d: D = { hello: 'world', zero: 'cho' }; // 가능

    type E = { hello: 'world' } | { zero: 'cho' }; // 여러 속성 중 하나만 있으면 됨(union)
    const e1: E = { hello: 'world' }; // 가능
    const e2: E = { hello: 'world', zero: 'cho' }; // 가능

    type Animal = { breath: true };
    type Mammalia = Animal & { breed: true }; // 상속
    type Human = Mammalia & { think: true }; // 상속

    const randy: Human = { breath: true, breed: true, think: true };

    // type, interface 간에 서로 extends, & 등 가능하다
    interface AA {
        breath: true;
    }
    interface BB extends AA {
        breed: true;
    }
    const bb: BB = { breath: true, breed: true };

    // 같은 이름으로 interface 선언할 때마다 합쳐진다
    // 이 특성으로 남의 라이브러리 고쳐 쓸 수 있음
    interface CC {
        talk: () => void;
    }
    interface CC {
        eat: () => void;
    }
    interface CC {
        shit: () => void;
    }
    const cc: CC = { talk() {}, eat() {}, shit() {} };

    // naming rule: interface앞에 I, type앞에 T, enum앞에 E 붙이는 경우가 있고 안붙이는 경우가 있음
    // 요즘 추세는 안붙임
};
