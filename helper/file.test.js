import { readFileAsync } from "./file.js";
describe("test function readFileAsync", () => {
  it("testing error ", async () => {
    const fileContents = await readFileAsync("public/example.txt");
    expect(fileContents).toEqual(
      "hello world i love code but code not love me"
    );
  });
});
