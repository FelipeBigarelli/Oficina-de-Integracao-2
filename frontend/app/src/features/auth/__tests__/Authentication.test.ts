import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { api, getToken, getUser, getUserId, isAuthenticated, login, logout, signUp } from "./../services/Authentication";

describe("Authentication Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve fazer login com sucesso", async () => {
    const credentials = { email: "email@example.com", password: "senha" };
    const response = { token: "token", user: { id: "1", name: "Nome", email: "email@example.com", is_admin: false } };

    jest.spyOn(api, "fetch").mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: "OK",
        headers: new Headers(),
        json: async () => response,
      } as Response);

    const result = await login(credentials);
    expect(result).toEqual(response);
    expect(getToken()).toBe("token");
    expect(getUser()).toEqual(response.user);
  });

  it("deve fazer logout com sucesso", () => {
    logout();
    expect(localStorage.getItem("authToken")).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();
  });

  it("deve verificar se o usuário está autenticado", () => {
    const token = "token";
    const user = { id: "1", name: "Nome", email: "email@example.com", is_admin: false };

    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    expect(isAuthenticated()).toBe(true);
  });

  it("deve criar um novo usuário com sucesso", async () => {
    const userData = { name: "Nome", email: "email@example.com", password: "senha" };

    jest.spyOn(api, "fetch").mockResolvedValueOnce({
        ok: true,
        status: 201,
        statusText: "Created",
        headers: new Headers(),
      } as Response);

    await signUp(userData);
    expect(api.fetch).toHaveBeenCalledTimes(1);
    expect(api.fetch).toHaveBeenCalledWith("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  });

  it("deve retornar o usuário autenticado", () => {
    const user = { id: "1", name: "Nome", email: "email@example.com", is_admin: false };

    localStorage.setItem("user", JSON.stringify(user));

    expect(getUser()).toEqual(user);
  });

  it("deve retornar o ID do usuário autenticado", () => {
    const user = { id: "1", name: "Nome", email: "email@example.com", is_admin: false };

    localStorage.setItem("user", JSON.stringify(user));

    expect(getUserId()).toBe("1");
  });

  it("deve retornar o token do usuário autenticado", () => {
    const token = "token";

    localStorage.setItem("authToken", token);

    expect(getToken()).toBe(token);
  });
});