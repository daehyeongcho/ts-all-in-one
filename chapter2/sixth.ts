const sixth = () => {
    // optional
    function abc(a: number, b?: number, c?: number) {}
    abc(1)
    abc(1, 2)
    abc(1, 2, 3)
    // abc(1, 2, 3, 4) // 에러

    function abc2(...args: number[]) {} // 개수 제한 x
    abc2(1, 2, 3, 4, 5)

    let obj: { a: String; b?: string } = { a: 'a', b: 'b' }
    obj = { a: 'b' }

    // generic
    // * 잘못된 코드
    // function add(x: string | number, y: string | number): string | number {
    //     return x + y
    // }
    // * what we want
    // add(1, 2) // 3
    // add('1', '2') // '12'
    // * 밑의 경우를 배제하지 못해서 에러남
    // add(1, '2')
    // add('1', 2)

    // * 올바른 코드
    function add<T extends number | string>(x: T, y: T): T
    function add(x: any, y: any) {
        return x + y
    }
    add(1, 2)
    add('1', '2')

    // add('1', 2)
    // add(2, '1')

    // * <T extends {...}>
    // * <T extends any[]>
    // * <T extends (...args: any) => any>
    // * <T extends abstract new (...args: any) => any> // 생성자

    // 기본값
    const a = (b: number = 3, c: number = 5) => '3'
    const b = (c: { children: string } = { children: 'randy' }) => {}
    const add2 = <T = unknown>(x: T, y: T) => ({ x, y }) // <T>는 리액트랑 헷갈려해서 unknown같은 기본값 붙여놓으면 에러 안남
    const result = add2(1, 2)
}
