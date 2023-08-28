export function generateOutput(number) {
  const output = [];

  for (let i = 1; i <= number; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      output.push("Frontend Backend");
    } else if (i % 3 === 0) {
      output.push("Frontend");
    } else if (i % 5 === 0) {
      output.push("Backend");
    } else {
      output.push(i);
    }
  }

  return output.join(",");
}
