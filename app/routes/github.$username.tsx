import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Types, Repositories, GitHubApi } from "../features/github";

//PONTO DE ENTRADA DA ROTA ONDE É FEITO ACESSO A DADOS POR EXEMPLO
export const loader: LoaderFunction = async ({
  params,
}): Promise<Types.Repositories.LoaderData> => {
  return {
    user: await GitHubApi.getUser(params.username),
    repos: await GitHubApi.getRepos(params.username),
  };
};

export default function () {
  const { user, repos } = useLoaderData<Types.Repositories.LoaderData>();

  return <Repositories user={user} repos={repos} />;
}
