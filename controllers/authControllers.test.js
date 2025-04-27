import { loginController } from "./authControllers.js";
import * as authService from "../services/authService.js";
import HttpError from "../helpers/HttpError.js";

describe("loginController", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { body: { email: "test@example.com", password: "password123" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should respond with 200 and return token + user object", async () => {
    const mockResult = {
      token: "mock-token-abc123",
      user: { email: "test@example.com", subscription: "starter" },
    };
    jest.spyOn(authService, "login").mockResolvedValue(mockResult);

    await loginController(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith(mockResult);

    expect(typeof mockResult.token).toBe("string");

    const user = mockResult.user;
    expect(Object.keys(user)).toEqual(["email", "subscription"]);
    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
  });

  it("should call next with HttpError(401) on invalid credentials", async () => {
    jest.spyOn(authService, "login").mockResolvedValue(null);

    await loginController(req, res, next);

    expect(next).toHaveBeenCalled();
    const err = next.mock.calls[0][0];
    expect(err.status).toBe(401);
    expect(err.message).toBe("Email or password is wrong");
  });

  it("should call next with validation error (400) if body invalid", async () => {
    req.body = { email: "nope" }; // missing password
    await loginController(req, res, next);

    expect(next).toHaveBeenCalled();
    const err = next.mock.calls[0][0];
    expect(err.status).toBe(400);
    expect(typeof err.message).toBe("string");
  });
});
