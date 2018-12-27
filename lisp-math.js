const negate = fn => val => !fn(val)
const toInt = i => parseInt(i, 10)

const mathFuncs = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
}

const calculate = (operator, [head, ...tail]) =>
  tail.reduce(mathFuncs[operator], head)

const lispRegex = /\({1}([\+\-\*\/])\s([\s\-?\d]*)*\){1}/g

const lisp = str => {
  const result = str.replace(lispRegex, (_, operator, numbers) =>
    calculate(
      operator,
      numbers
        .trim()
        .split(' ')
        .map(toInt)
        .filter(negate(isNaN)),
    ),
  )

  return isNaN(result) ? lisp(result) : result
}

export default lisp
