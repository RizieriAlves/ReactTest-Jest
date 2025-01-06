import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import HomeRoute from "./HomeRoute";
import { rest } from "msw";
import { MemoryRouter } from "react-router-dom";
import { createServer } from "../Test/server";

createServer([
  {
    // Configuração deste objeto será para requisições para este caminho:
    path: "/api/repositories",
    //sem method configuramos como get.
    method: "get",
    // Ações que queremos fazer com a requisição.
    // neste caso, obter o nome da linguagem e definir o retorno
    res: (req) => {
      const language = req.url.searchParams.get("q").split("language:")[1];
      //Retorno definido diretamente aqui:
      return {
        items: [
          { id: 1, full_name: `${language}_repo_1` },
          { id: 2, full_name: `${language}_repo_2` },
        ],
      };
    },
  },
]);

test("Mostrar 6 linguagens principais na tela inicial e seus repositorios", async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );

  const languages = [
    "python",
    "java",
    "typescript",
    "go",
    "javascript",
    "rust",
  ];

  for (let language of languages) {
    const repos = await screen.findAllByRole("link", {
      name: new RegExp(`${language}_repo`),
    });

    expect(repos).toHaveLength(2);
  }
});
