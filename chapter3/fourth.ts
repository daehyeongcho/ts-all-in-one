interface Axios {
    get(): Promise<void>;
}

// interface는 javascript에서 사라지기 때문에 instanceof 같은 코드를 쓸 수 없음.
class CustomError extends Error {
    response?: {
        data: any;
    };
}
declare const axios: Axios;

(async () => {
    try {
        await axios.get();
    } catch (err) {
        // console.log((err as CustomError).response?.data); // as는 일회성임
        // err.response?.data; // 여기선 또 에러남

        // 위의 코드는 위험함. 타입가드로 타입을 좁혀줘야 한다.
        if (err instanceof CustomError) {
            console.log(err.response?.data);
            console.log(err.response?.data);
        }

        // as를 반드시 써야할 경우 - unknown일 때
    }
})();
