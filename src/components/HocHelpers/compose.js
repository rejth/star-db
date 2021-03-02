const compose = (...func) => component =>
  func.reduceRight((previousValue, f) => f(previousValue), component);

export default compose;
