import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

test("Possui dois inputs e um botão", () => {
  render(<UserForm />);

  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("encontrar dois inputs e chamar função ao clicar no botão", async () => {
  const mock = jest.fn();
  render(<UserForm onUserAdd={mock} />);

  const [name, email] = screen.getAllByRole("textbox");

  await user.click(name);
  await user.keyboard("vini");

  await user.click(email);
  await user.keyboard("vinicius@hotmail.com");

  const button = screen.getByRole("button");

  await user.click(button);

  expect(mock).toHaveBeenCalledTimes(1);
  expect(mock).toHaveBeenCalledWith({
    name: "vini",
    email: "vinicius@hotmail.com",
  });
});

test("Limpar formulário após envio", async () => {
  render(<UserForm onUserAdd={() => {}} />);

  const name = screen.getByRole("textbox", { name: /name/i });
  const email = screen.getByRole("textbox", { name: /email/i });

  await user.click(name);
  await user.keyboard("vini");

  await user.click(email);
  await user.keyboard("vinicius@hotmail.com");

  const button = screen.getByRole("button");
  await user.click(button);

  expect(name).toHaveValue("");
  expect(email).toHaveValue("");
});
