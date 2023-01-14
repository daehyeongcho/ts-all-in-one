const fourth = async () => {
    interface A {
        talk: () => void;
    }
    const a: A = {
        talk() {
            return 3;
        },
    };
    // any vs unknown
    const b: any = a.talk();
    b.method(); // any 쓰면 타입 검사를 포기해버린다. 아무거나 막 됨
    const c: unknown = a.talk(); // 지금 당장은 타입을 잘 모르겠다.
    (c as A).talk(); // 타입을 정해줘서 쓰면 됨.

    try {
        a.talk();
    } catch (error) {
        // error의 타입: unknown
        // console.error(error.message) // 에러남
        console.error((error as Error).message); // ok
    }

    function numOrStr(a: number | string) {
        // a.toFixed(1) // ts에서 에러남
        // ;(a as number).toFixed(1) // js에서 에러남

        // 타입가드(타입 좁히기)
        if (typeof a === 'string') {
            a.split(',');
        } else {
            a.toFixed(1);
        }
        if (typeof a === 'boolean') {
            // a.toString() // a가 boolean일 일이 없음. 그래서 never 뜸
        }
    }
    numOrStr('123');
    numOrStr(1);

    function numOrNumArray(a: number | number[]) {
        if (Array.isArray(a)) {
            a.concat(4);
        } else {
            a.toFixed(1);
        }
    }
    numOrNumArray(123);
    numOrNumArray([1, 2, 3]);

    class AA {
        aaa() {}
    }
    class BB {
        bbb() {}
    }
    function aOrB(param: AA | BB) {
        // param.aaa() // 에러
        if (param instanceof AA) {
            param.aaa();
        }
    }
    // aOrB(A) // 에러
    aOrB(new AA()); // 인스턴스를 넘겨야 함
    aOrB(new BB());

    type C = { type: 'c'; ccc: string };
    type D = { type: 'd'; ddd: string };
    type E = { type: 'e'; eee: string };

    // 공통된 속성의 값으로 타입 구분
    function typeCheckByValue(obj: C | D | E) {
        if (obj.type === 'c') {
            console.log(obj.ccc);
        } else if (obj.type === 'd') {
            console.log(obj.ddd);
        } else {
            console.log(obj.eee);
        }
    }
    // unique property로 타입 구분
    function typeCheckByPropertyName(obj: C | D | E) {
        if ('ccc' in obj) {
            console.log(obj.type);
        } else if ('ddd' in obj) {
            console.log(obj.type);
        } else {
            console.log(obj.type);
        }
    }
    /* 가능하면 'type' 같은 property 하나씩 만들어두는게 좋음(태깅이라고 생각하자) */

    interface Cat {
        meow: number;
    }
    interface Dog {
        bow: number;
    }
    // 커스텀 타입 가드
    function catOrDog(a: Cat | Dog): a is Dog {
        // a가 Dog이려면 meow가 없어야 한다.
        if ((a as Cat).meow) {
            return false;
        }
        return true;
    }
    function pet(a: Cat | Dog) {
        if (catOrDog(a)) {
            console.log(a.bow);
        }
        if ('meow' in a) {
            console.log(a.meow);
        }
    }

    // 커스텀 타입 가드 실전 예제
    const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult =>
        input.status === 'rejected';

    const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> =>
        input.status === 'fulfilled';

    // * Promise -> Pending -> Settled(Fulfilled, Rejected)

    const promises = await Promise.allSettled([Promise.resolve('a'), Promise.resolve('b')]); // 성공했는지 실패했는지 모름

    // const errors = promises.filter(a => true) // errors의 타입: PromiseSettledResult[]
    // const errors = promises.filter(promise => promise.status === 'rejected') // errors의 타입: PromiseSettledResult[]
    const errors = promises.filter(isRejected); // errors의 타입: PromiseRejectedResult[]. is가 있어야 제대로 추론해준다.
};

const x: {} = true;
const y: Object = 'hi'; // {}, Object - 모든 타입(null과 undefined 제외)
// const xx: object = 'hi' // 에러
const yy: object = { hello: 'world' }; // object 지양. interface, type, class 사용
const z: unknown = 'hi';

// unknown === {} | null | undefined
if (z) {
    console.log(z); // 타입: {}
} else {
    console.log(z); // 타입: unknown
}
