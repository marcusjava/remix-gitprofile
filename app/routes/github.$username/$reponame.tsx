import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { GitHubApi, Types } from "~/features/github";
import Commits from "~/features/github/components/Commits";

export const loader: LoaderFunction = async ({
  params,
}): Promise<Types.Commits.LoaderData> => {
  const { username, reponame } = params;
  const commits = await GitHubApi.getCommits(username, reponame);
  const user = await GitHubApi.getUser(username);
  return {
    user,
    commits,
  };
};

export default function () {
  const { user, commits } = useLoaderData<Types.Commits.LoaderData>();
  const { reponame } = useParams();

  return <Commits user={user} commits={commits} reponame={reponame} />;
}
