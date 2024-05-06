import supertest from "supertest";
import { app } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";
import { logger } from "../src/application/log.js";

/**
 * test for Register User API
 */
describe("POST /api/users", () => {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: "ftthreign",
      },
    });
  });

  // check it can register new user
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

  // check if have duplicate data user, return error
  it("should reject if already register", async () => {
    let result = await supertest(app).post("/api/users").send({
      username: "ftthreign",
      password: "hash123",
      name: "Ftthreign123",
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("ftthreign");
    expect(result.body.data.name).toBe("Ftthreign123");
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(app).post("/api/users").send({
      username: "ftthreign",
      password: "hash123",
      name: "Ftthreign123",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  // check if data is null
  it("should reject request", async () => {
    const result = await supertest(app).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  // check if one of the field is null
  const testCases = [
    {
      field: "username",
      username: "",
      password: "hash123",
      name: "Ftthreign123",
    },
    {
      field: "password",
      username: "ftthreign",
      password: "",
      name: "Ftthreign123",
    },
    { field: "name", username: "ftthreign", password: "hash123", name: "" },
  ];

  testCases.forEach(({ field, username, password, name }) => {
    it(`should reject request with empty ${field}`, async () => {
      const body = { username, password, name };

      const result = await supertest(app).post("/api/users").send(body);

      logger.info(result.body);

      expect(result.status).toBe(400);
      expect(result.body.errors).toBeDefined();
    });
  });
});

/**
 * test for Login User API
 */
describe("POST /api/users/login", () => {
  beforeEach(async () => {
    await prismaClient.user.create({
      data: {
        username: "ftthreign",
        password: "hash123",
        name: "Ftthreign123",
      },
    });
  });

  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: "ftthreign",
      },
    });
  });
});
