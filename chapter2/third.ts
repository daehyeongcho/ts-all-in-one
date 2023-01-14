const third = () => {
    type A1 = string | number; // 넓은 타입 (합집합)
    type A2 = string; // 좁은 타입
    type A3 = string & number; // 더 좁은 타입 (교집합) - never: 공집합 / any: 전체 집합

    // 객체는 상세할 수록 더 좁다
    type A = { name: string }; // 넓은 타입
    type B = { age: number }; // 넓은 조입
    type C = { name: string; age: number }; // 좁은 타입
    type AB = A | B;
    type D = A & B; // C랑 같음

    const ab: AB = { name: 'randy' }; // 더 넓은 타입에 더 좁은 타입 대입 가능
    // const c: C = { name: 'randy' } // 더 좁은 타입에 더 넓은 타입 대입 불가능

    // 잉여 속성 검사
    // const c: C = { name: 'randy', age: 34, married: false } // 더 넓은 타입에 더 좁은 타입 대입했는데도 안됨(잉여 속성 검사)
    const obj = { name: 'randy', age: 34, married: false };
    const d: D = obj; // 이렇겐 가능

    // void
    // 함수의 return 값이 void - return 값이 '없다'란 의미
    // return 값 쓰면 에러남
    function a(callback: () => void): void {
        return; // return '3' 안됨
    }
    // 매개변수, 메서드의 return 값이 void - return 값을 '사용하지 않겠다'는 의미
    // return 값 써도 됨
    a(() => {
        return '3';
    });

    interface Human {
        talk: () => void;
    }
    const human: Human = {
        talk() {
            return 'abc';
        },
    };

    // const randy = human.talk()  // void가 되어버림
    // const randy = human.talk() as string // 에러남
    const randy2 = human.talk() as unknown as string; // 의도적으로 바꾸려면
};

// declare 선언하면 구현부가 없어도 됨 (외부에서 구현되어 있는 함수를 타입선언함)
declare function forEach(arr: number[], callback: (el: number) => void): void;

const target: number[] = [];
// 아래와 같은 두 가지 경우를 모두 허용하기 위해서 return 값을 신경쓰지 않는다.
forEach([1, 2, 3], el => target.push(el)); // undefined: 에러남 / void: 에러 안남 (return 값을 신경쓰지 않겠다)
forEach([1, 2, 3], el => {
    target.push(el);
});
