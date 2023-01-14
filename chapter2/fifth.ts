const fifth = () => {
    interface ReadOnly {
        readonly a: string
        b: string
    }

    // indexed signiture
    type Str = { [key: string]: string } // 어떤 키든 간에 키 네임이 string, 값도 string이었으면 좋겠다.

    // mapped types
    type Life = 'Human' | 'Mammal' | 'Animal' // interface론 and, or 안됨
    type LifeObject = { [key in Life]: number }
    const aaaa: LifeObject = { Human: 1, Mammal: 2, Animal: 3 }

    class Example {
        a: string
        b: number
        constructor(a: string, b: number = 123) {
            this.a = a
            this.b = b
        }

        method() {}
    }

    // class Example {
    //     a: string = '123'
    //     b: number = 123
    // }

    // * class 이름: 인스턴스의 타입
    // * class 자체의 타입: typeof A

    // * 참고: 이렇게 구현하면 에러난다.
    // * interface는 'public contracts'만을 정의한다.
    // * public property 외엔 interface에 기재하지 않는 게 옳다.
    // interface A {
    //     readonly a: string
    //     b: string
    //     c: string
    // }

    // * 이렇게 구현해야 에러 안남
    interface A {
        c: string
    }

    class B {
        private a: string = '123' // 타입스크립트의 private - 추천
        protected b: string = '234'
        #c: number = 123 // 자바스크립트의 private
    }

    class C implements A {
        private a: string = '123'
        protected b: string = 'world'
        c: string = 'wow'

        method() {
            console.log(this.a)
            console.log(this.b)
            console.log(this.c)
        }
    }

    class D extends C {
        // method() {
        //     console.log(this.a) // private 에러
        //     console.log(this.b) // protected 에러x
        //     console.log(this.c) // public 에러x
        // }
    }
    // console.log(new D().a) // private 에러
    // console.log(new D().b) // protected 에러
    // console.log(new D().c) // public 에러x

    // interface 대신 abstract class 쓰는게 더 나음
    abstract class Abstract {
        private a: string = '123'
        protected b: string = 'world'
        c: string = 'wow'

        method() {
            console.log(this.a)
            console.log(this.b)
            console.log(this.c)
        }
        abstract method2(): void
    }

    // abstract로 되어 있는 건 상속받았을 때 반드시 구현을 해야 한다.
    class E extends Abstract {
        method2() {
            console.log('must implement')
        }
    }
}
