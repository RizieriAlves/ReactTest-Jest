import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Para lidar com Link
import { createServer } from "../../Test/server"; // Para lidar com o fetch do login
import { SWRConfig } from "swr";
import AuthButtons from "./AuthButtons";

async function renderComponent() {
  render(
    <SWRConfig
      value={{
        provider: () => new Map(),
      }}
    >
      <MemoryRouter>
        <AuthButtons />
      </MemoryRouter>
    </SWRConfig>
  );

  await screen.findAllByRole("link");
}

describe("when the user is not sign in", () => {
  // Quando a página é carregada, é feita a requisição de User, que caso esteja deslogada, retornará user: null.
  // Usaremos isso para definir o retorno de nossa falsa requisição a Api.

  createServer([
    {
      method: "get",
      path: "/api/user",
      res: () => {
        return { user: null };
      },
    },
  ]);

  test("when user is not sign in, sign in and sign up are visible", async () => {
    await renderComponent();

    const signin = screen.getByRole("link", { name: /Sign in/i });
    const signup = screen.getByRole("link", { name: /Sign up/i });
    expect(signin).toBeInTheDocument();
    expect(signup).toBeInTheDocument();
  });

  test("when user is not sign in, sign out is not visible", async () => {
    await renderComponent();
    const signout = screen.queryByRole("link", { name: /Sign out/i });
    expect(signout).not.toBeInTheDocument();
  });
});

describe("when the user is sign in", () => {
  createServer([
    {
      method: "get",
      path: "/api/user",
      res: () => {
        return { user: { id: 1, email: "vinicius@hotmail.com" } };
      },
    },
  ]);

  test("when user is sign in, sign in and sign up are  not visible", async () => {
    await renderComponent();

    const signin = screen.queryByRole("link", { name: /sign in/i });
    const signup = screen.queryByRole("link", { name: /sign up/i });

    expect(signin).not.toBeInTheDocument();
    expect(signup).not.toBeInTheDocument();
  });
  test("when user is sign in, sign out is visible", async () => {
    await renderComponent();

    const signout = screen.getByRole("link", { name: /Sign out/i });
    expect(signout).toBeInTheDocument();
  });
});
