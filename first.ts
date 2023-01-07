const first = () => {
    // literal
    const a = '5'
    const b: number = 5
    const c: boolean = true
    const d: undefined = undefined
    const e: null = null
    const f: symbol = Symbol.for('abc')
    const g: any = 123

    // function
    function add(x: number, y: number): number {
        return x + y
    }
    const addArrow: (x: number, y: number) => number = (x, y) => x + y

    // object
    const obj: { lat: number; lon: number } = { lat: 37.5, lon: 127.5 }

    // array
    const arr: string[] = ['123', '456']
    const arr2: Array<number> = [123, 456]
    const arr3: [number, number, string] = [123, 456, 'hello'] // tuple

    // 원시값 타입
    const h: true = true

    // 타입추론
    const ex1: string = '5' // '5'라는 원시값 타입이 더 정확함. 타입추론을 제대로 해주면 굳이 타입 쓰지 않는 걸 추천
    const ex2 = '5' // ex2: '5'
    // add2: (x: number, y: number) => number
    function add2(x: number, y: number) {
        return x + y
    }

    try {
        /**
         * * noImplicitAny === false && strictNullChecks === true일 때 emptyArray: never[]로 뜸
         */
        const emptyArray = []
        // emptyArray.push('123')
    } catch (error) {
        console.error(error)
    }

    // non-null assertion
    const head = document.querySelector('#head')! // 쓰지말자
    const head2 = document.querySelector('#head') // 이걸 더 추천
    if (head) {
        head.innerHTML = 'hello world'
        console.log(head)
    }

    const str1: string = 'hello'
    const str2: String = 'hell' // 되긴 하지만 쓰지마라

    type World = 'world' | 'hell'
    const world: World = 'world'

    type Greeting = `hello ${World}`
    const greet: Greeting = 'hello hell'

    const rest: (...args: string[]) => void = (...args) => {
        console.log(args)
    }
    rest('abc')

    const tuple: [string, number] = ['1', 1]
    // tuple[2] = 'hello' // error
    tuple.push('hello') // 이건 됨
}
