var sec3Second = function () {
    var p1 = Promise.resolve(1)
        .then(function (a) { return a + 1; })
        .then(function (a) { return a + 1; })
        .then(function (a) { return a.toString(); });
    var p2 = Promise.resolve(2);
    var p3 = new Promise(function (resolve, reject) {
        setTimeout(resolve, 1000);
    });
    Promise.all([p1, p2, p3]).then(function (result) {
        console.log(result);
    });
};
sec3Second();
