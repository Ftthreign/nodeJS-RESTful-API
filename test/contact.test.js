import supertest from "supertest";
import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";
import { app } from "../src/application/web.js";

const getTestContact = async () => {
  return prismaClient.contact.findFirst({
    where: {
      username: "ftthreign",
    },
  });
};

describe("POST /api/contacts", () => {
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
    await prismaClient.contact.deleteMany({
      where: {
        username: "ftthreign",
      },
    });
    await prismaClient.user.deleteMany({
      where: {
        username: "ftthreign",
      },
    });
  });

  it("should can create new contact", async () => {
    const result = await supertest(app)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "test",
        last_name: "test",
        email: "test@ftthreign.com",
        phone: "082424240535",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe("test");
    expect(result.body.data.last_name).toBe("test");
    expect(result.body.data.email).toBe("test@ftthreign.com");
    expect(result.body.data.phone).toBe("082424240535");
  });

  it("should reject if request is not valid", async () => {
    const result = await supertest(app)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "test",
        last_name: "test",
        email: "test@ftthreign.com",
        phone: "0824242405356565657676858",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await prismaClient.user.create({
      data: {
        username: "ftthreign",
        password: await bcrypt.hash("hash123", 10),
        name: "Ftthreign123",
        token: "test",
      },
    });
    await prismaClient.contact.create({
      data: {
        username: "ftthreign",
        first_name: "test",
        last_name: "test",
        email: "test@ftthreign.com",
        phone: "0842342443",
      },
    });
  });

  afterEach(async () => {
    await prismaClient.contact.deleteMany({
      where: {
        username: "ftthreign",
      },
    });
    await prismaClient.user.deleteMany({
      where: {
        username: "ftthreign",
      },
    });
  });

  it("should can get contact", async () => {
    const testContact = await getTestContact();
    const result = await supertest(app)
      .get("/api/contacts/" + testContact.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe(testContact.first_name);
    expect(result.body.data.last_name).toBe(testContact.last_name);
    expect(result.body.data.email).toBe(testContact.email);
    expect(result.body.data.phone).toBe(testContact.phone);
  });

  it("should return 404 if contactId is not found", async () => {
    const testContact = await getTestContact();
    const result = await supertest(app)
      .get("/api/contacts/" + testContact.id + 1)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await prismaClient.user.create({
      data: {
        username: "ftthreign",
        password: await bcrypt.hash("hash123", 10),
        name: "Ftthreign123",
        token: "test",
      },
    });
    await prismaClient.contact.create({
      data: {
        username: "ftthreign",
        first_name: "test",
        last_name: "test",
        email: "test@ftthreign.com",
        phone: "0842342443",
      },
    });
  });

  afterEach(async () => {
    await prismaClient.contact.deleteMany({
      where: {
        username: "ftthreign",
      },
    });
    await prismaClient.user.deleteMany({
      where: {
        username: "ftthreign",
      },
    });
  });

  it("should can update existing contact", async () => {
    const testContact = await getTestContact();

    const result = await supertest(app)
      .put("/api/contacts/" + testContact.id)
      .set("Authorization", "test")
      .send({
        first_name: "Fadhil",
        last_name: "Fattah",
        email: "fadhi@gmai.com",
        phone: "042040240",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe("Fadhil");
    expect(result.body.data.last_name).toBe("Fattah");
    expect(result.body.data.email).toBe("fadhi@gmai.com");
    expect(result.body.data.phone).toBe("042040240");
  });

  it("should reject if request is invalid", async () => {
    const testContact = await getTestContact();

    const result = await supertest(app)
      .put("/api/contacts/" + testContact.id)
      .set("Authorization", "test")
      .send({
        first_name: "",
        last_name: "",
        email: "fadhi",
        phone: "",
      });

    expect(result.status).toBe(400);
  });

  it("should reject if contact is not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(app)
      .put("/api/contacts/" + testContact.id + 1)
      .set("Authorization", "test")
      .send({
        first_name: "Fadhil",
        last_name: "Fattah",
        email: "fadhi@gmai.com",
        phone: "042040240",
      });

    expect(result.status).toBe(404);
  });
});

describe("DELETE /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await prismaClient.user.create({
      data: {
        username: "ftthreign",
        password: await bcrypt.hash("hash123", 10),
        name: "Ftthreign123",
        token: "test",
      },
    });
    await prismaClient.contact.create({
      data: {
        username: "ftthreign",
        first_name: "test",
        last_name: "test",
        email: "test@ftthreign.com",
        phone: "0842342443",
      },
    });
  });

  afterEach(async () => {
    await prismaClient.contact.deleteMany({
      where: {
        username: "ftthreign",
      },
    });
    await prismaClient.user.deleteMany({
      where: {
        username: "ftthreign",
      },
    });
  });

  it("should can delete contact", async () => {
    let testContact = await getTestContact();
    const result = await supertest(app)
      .delete("/api/contacts/" + testContact.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testContact = await getTestContact();
    expect(testContact).toBeNull();
  });

  it("should reject if contact is not found", async () => {
    let testContact = await getTestContact();
    const result = await supertest(app)
      .delete("/api/contacts/" + testContact.id + 1)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});
