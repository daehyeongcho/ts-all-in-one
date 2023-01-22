const ch3Third = () => {
    // 공변성, 반공변성, 이변성, 불변성

    type A = (x: string) => number;
    const a: A = x => 0;

    a('1'); // 1

    type B = (x: string) => number | string;
    const b: B = a; // return 값은 더 넓은 타입으로 대입이 됨.
    // const c: A = b; // 대입 안 됨.

    type C = (x: string | number) => number;
    const c: C = x => 0;
    const aa: A = c; // 매개변수는 반대로(좁은 타입으로 대입)

    const bb: B = c; // 대입 가능.

    interface Add {
        (x: number, y: number): number;
        (x: string, y: string): string;
    }

    const add: Add = (x, y) => x + y;

    class D {
        add(x: number, y: number): number;
        add(x: string, y: string): string;
        add(x: any, y: any) {
            // 구현부에선 any 써도됨. 타입검사에 악영향을 끼치지 않기 때문에.
            return x + y;
        }
    }
    const d = new D().add(1, 2);
    const dd = new D().add('1', '2');
};

// type overloading
declare function add(x: number, y: number): number;
declare function add(x: number, y: number, z: number): number;
declare function add(x: string, y: string): string;

add(1, 2);
add(1, 2, 3);
add('1', '2');
