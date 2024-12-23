import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";

test("Recebe um novo usuário e o mostra na lista", async () => {
  render(<App />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  const button = screen.getByRole("button");

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(button).toBeInTheDocument();

  await user.click(nameInput);
  await user.keyboard("vinicius");

  await user.click(emailInput);
  await user.keyboard("vinicius@hotmail.com");

  await user.click(button);

  const name = screen.getByRole("cell", { name: "vinicius" });
  const email = screen.getByRole("cell", { name: "vinicius@hotmail.com" });

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
