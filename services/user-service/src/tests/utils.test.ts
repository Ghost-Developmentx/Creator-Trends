// tests/utils.test.ts
import * as bcrypt from "bcrypt";

describe("Utility Functions", () => {
  it("should hash a password correctly", async () => {
    const password = "testpassword";
    const hash = await bcrypt.hash(password, 10);
    const match = await bcrypt.compare(password, hash);
    expect(match).toBe(true);
  });
});
