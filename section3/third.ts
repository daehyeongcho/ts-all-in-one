const sec3Third = () => {
    function a(this: Window | typeof obj, param: string) {
        console.log(this.name);
    }

    const obj = { name: 'randy' };
    const b = a.bind(obj);
    b('abc');

    // bind<T>(this: T, thisArg: ThisParameterType<T>): OmitThisParameter<T>;

    // this의 타입을 추론
    type ThisParameterType<T> = T extends (this: infer U, ...args: never) => any ? U : unknown;
    // this를 없애는 type
    type OmitThisParameter<T> = unknown extends ThisParameterType<T> // this가 없는 상황
        ? T
        : T extends (...args: infer A) => infer R // this가 있어도 this를 제외한 나머지를 받아옴
        ? (...args: A) => R
        : T;

    type T = ThisParameterType<typeof a>;
    type NoThis = OmitThisParameter<typeof a>;

    /* bind 사용 예제 */
    const randy = {
        name: 'randy',
        sayHello(this: { name: string }) {
            console.log(`hi ${this.name}`);
        },
    };
    const sayHello = randy.sayHello;
    const sayHi = randy.sayHello.bind({ name: 'peter' }); // bind를 통해 this를 바꿔줌
    sayHi();

    function add(a: number, b: number, c: number, d: number, e: number, f: number) {
        return a + b + c + d + e + f;
    }

    const add1 = add.bind(null); // this를 null로 bind
    add1(1, 2, 3, 4, 5, 6);

    const add2 = add.bind(null, 1); // 매개변수 자리에 미리 값을 갖다놓음.
    add2(2, 3, 4, 5, 6);

    const add3 = add.bind(null, 1, 2);
    add3(3, 4, 5, 6);

    const add4 = add.bind(null, 1, 2, 3);
    add4(4, 5, 6);

    const add5 = add.bind(null, 1, 2, 3, 4);
    add5(5, 6);

    // 6개일때부턴 타이핑이 이상함
    // const add6 = add.bind(null, 1, 2, 3, 4, 5);
    // add6(6);
};

sec3Third();
