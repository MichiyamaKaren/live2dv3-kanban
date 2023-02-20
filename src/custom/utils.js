export { randomChoose, partial };

function randomChoose(array) {
    let random_i = Math.floor(Math.random() * array.length + 1) - 1;
    return array[random_i];
}

function partial(func) {
    let args = Array.prototype.slice.call(arguments, 1);
    return function () {
        let allArguments = args.concat(Array.prototype.slice.call(arguments));
        return func.apply(this, allArguments);
    };
}