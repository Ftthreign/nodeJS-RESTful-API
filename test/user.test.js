import supertest from "supertest";
import { app } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";
import { logger } from "../src/application/log.js";
import bcrypt from "bcrypt";

async function getTestUser() {
  return prismaClient.user.findUnique({
    where: {
      username: "ftthreign",
    },
  });
}

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
        password: await bcrypt.hash("hash123", 10),
        name: "Ftthreign123",
        token: "test",
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

  it("should can login", async () => {
    const result = await supertest(app).post("/api/users/login").send({
      username: "ftthreign",
      password: "hash123",
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe("test");
  });

  it("should reject login if req is invalid", async () => {
    const result = await supertest(app).post("/api/users/login").send({
      username: "",
      password: "",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject login if password is wrong", async () => {
    const result = await supertest(app).post("/api/users/login").send({
      username: "ftthreign",
      password: "wrong",
    });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject login if username is wrong", async () => {
    const result = await supertest(app).post("/api/users/login").send({
      username: "wrongusername",
      password: "wrongpassword",
    });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/users/current", () => {
  beforeEach(async () => {
    await prismaClient.user.create({
      data: {
        username: "ftthreign",
        password: await bcrypt.hash("hash123", 10),
        name: "Ftthreign123",
        token: "test",
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

  it("should get current user", async () => {
    const result = await supertest(app)
      .get("/api/users/current")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("ftthreign");
    expect(result.body.data.name).toBe("Ftthreign123");
  });

  it("should reject if token is invalid", async () => {
    const result = await supertest(app)
      .get("/api/users/current")
      .set("Authorization", "tokensalah");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PATCH /api/users/current", () => {
  beforeEach(async () => {
    await prismaClient.user.create({
      data: {
        username: "ftthreign",
        password: await bcrypt.hash("hash123", 10),
        name: "Ftthreign123",
        token: "test",
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

  it("should can update user", async () => {
    const result = await supertest(app)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        name: "Fadhil",
        password: "Rahasialagi",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("ftthreign");
    expect(result.body.data.name).toBe("Fadhil");

    const user = await getTestUser();

    logger.info(result.body);

    expect(await bcrypt.compare("Rahasialagi", user.password)).toBe(true);
  });

  it("should can update user name", async () => {
    const result = await supertest(app)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        name: "Fadhil",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("ftthreign");
    expect(result.body.data.name).toBe("Fadhil");
  });

  it("should can update user password", async () => {
    const result = await supertest(app)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        password: "Rahasialagi",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("ftthreign");
    expect(result.body.data.name).toBe("Ftthreign123");
  });

  it("should reject if request is not valid", async () => {
    const result = await supertest(app)
      .patch("/api/users/current")
      .set("Authorization", "salah")
      .send({
        password: "",
      });

    expect(result.status).toBe(401);
  });
});

describe("DELETE /api/users/logout", () => {
  beforeEach(async () => {
    await prismaClient.user.create({
      data: {
        username: "ftthreign",
        password: await bcrypt.hash("hash123", 10),
        name: "Ftthreign123",
        token: "test",
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

  it("should can logout", async () => {
    const result = await supertest(app)
      .delete("/api/users/logout")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    const user = await getTestUser();

    expect(user.token).toBeNull();
  });

  it("should reject logout if token is invalid", async () => {
    const result = await supertest(app)
      .delete("/api/users/logout")
      .set("Authorization", "salah");

    expect(result.status).toBe(401);
  });
});
