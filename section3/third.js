var sec3Third = function () {
    function a() {
        console.log(this.name);
    }
    var obj = { name: 'randy' };
    var b = a.bind(obj);
    b();
};
sec3Third();
