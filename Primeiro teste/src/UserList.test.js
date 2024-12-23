import { screen, render } from "@testing-library/react";
import UserList from "./UserList";

test("Renderizar uma linha por usuário", () => {
  const users = [
    { name: "Vinicius", email: "vinicius@hotmail.com" },
    {
      name: "Lucas",
      email: "lucas@hotmail.com",
    },
    {
      name: "Luciano",
      email: "luciano@hotmail.com",
    },
  ];

  const { container } = render(<UserList users={users} />);

  //Find ideal Query screen.logTestingPlaygroundURL();
  //const rows = screen.getAllByRole("row");
  //expect(rows).toHaveLength(users.length + 1);

  //eslint-disable-next-line
  const rows = container.querySelectorAll("tbody tr");

  expect(rows).toHaveLength(users.length);
});

test("Verificação de renderização de nome e email", () => {
  const users = [
    { name: "Vinicius", email: "vinicius@hotmail.com" },
    {
      name: "Lucas",
      email: "lucas@hotmail.com",
    },
  ];
  render(<UserList users={users} />);

  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
