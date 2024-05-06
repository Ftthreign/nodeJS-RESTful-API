import supertest from "supertest";
import { app } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";

describe("POST /api/users", () => {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: "ftthreign",
      },
    });
  });

  it("should can register new user", async () => {
    const result = await supertest(app).post("/api/users").send({
      username: "ftthreign",
      password: "hash123",
      name: "Ftthreign123",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("ftthreign");
    expect(result.body.data.name).toBe("Ftthreign123");
    expect(result.body.data.password).toBeUndefined();
  });
});
