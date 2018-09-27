"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);


runtime.mark = function (genFun) {
    if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        if (!(toStringTagSymbol in genFun)) {
            genFun[toStringTagSymbol] = "GeneratorFunction";
        }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
};

function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
}

function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
        if (state === GenStateExecuting) {
            throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
            if (method === "throw") {
                throw arg;
            }

            // Be forgiving, per 25.3.3.3.3 of the spec:
            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
            return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
            var delegate = context.delegate;
            if (delegate) {
                var delegateResult = maybeInvokeDelegate(delegate, context);
                if (delegateResult) {
                    if (delegateResult === ContinueSentinel) continue;
                    return delegateResult;
                }
            }

            if (context.method === "next") {
                // Setting context._sent for legacy support of Babel's
                // function.sent implementation.
                context.sent = context._sent = context.arg;

            } else if (context.method === "throw") {
                if (state === GenStateSuspendedStart) {
                    state = GenStateCompleted;
                    throw context.arg;
                }

                context.dispatchException(context.arg);

            } else if (context.method === "return") {
                context.abrupt("return", context.arg);
            }

            state = GenStateExecuting;

            var record = tryCatch(innerFn, self, context);
            if (record.type === "normal") {
                // If an exception is thrown from innerFn, we leave state ===
                // GenStateExecuting and loop back for another invocation.
                state = context.done
                    ? GenStateCompleted
                    : GenStateSuspendedYield;

                if (record.arg === ContinueSentinel) {
                    continue;
                }

                return {
                    value: record.arg,
                    done: context.done
                };

            } else if (record.type === "throw") {
                state = GenStateCompleted;
                // Dispatch the exception by looping back around to the
                // context.dispatchException(context.arg) call above.
                context.method = "throw";
                context.arg = record.arg;
            }
        }
    };
}

exports.default = function (fn) {
    return function () {
        var gen = fn.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            function step(key, arg) {
                try {
                    var info = gen[key](arg);
                    var value = info.value;
                } catch (error) {
                    reject(error);
                    return;
                }

                if (info.done) {
                    resolve(value);
                } else {
                    return Promise.resolve(value).then(function (value) {
                        step("next", value);
                    }, function (err) {
                        step("throw", err);
                    });
                }
            }

            return step("next");
        });
    };
};

var foo = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var a;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return new _promise2.default(function (resolve) {
                            setTimeout(function () {
                                console.log(111);

                                resolve(1);
                            }, 2000);
                        });

                    case 2:
                        a = _context.sent;

                        console.log(a);

                    case 4:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function foo() {
        return _ref.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
foo();

/**
 * 流程
   foo(); ======执行_ref.apply(this.argument);
    ps: ref 为函数是asyncToGenerator.default方法返回的函数
    执行ref函数 ========》先_regenerator2.default.mark()返回的函数执行，然后返回Promise 
    执行Promise step("next")=====》为了得到info和value 会执行被mark过的_callee函数，使该函数继承generator和函数
    然后_callee开始执行============= 返回一个执行函数，又开始执行wrap,返回一个generatord对象，赋值给gen,
    wrap函数会调用makeInvokeMethod的方法,把方法注入生成generrator的对象
    最后step(next)会递归执行generator函数直到状态为done

*/
