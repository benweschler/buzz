export function fireAfterCalls(count, f) {
  let numberOfCalls = 0
  return function () {
    numberOfCalls++
    if (numberOfCalls === count)
      f()
  };
}
