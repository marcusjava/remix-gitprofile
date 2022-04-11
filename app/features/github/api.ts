import { Types } from ".";
import invariant from "tiny-invariant";
import pick from "lodash/pick";

const config = {
  headers: {
    accept: "application/vnd.github.v3+json",
    Authorization: "token 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",
  },
};

export const getUser = async (username?: string): Promise<Types.User> => {
  invariant(username, "Please provide an username as string");
  const res = await fetch(
    `https://api.github.com/users/${username.toLocaleLowerCase()}`,
    config
  );
  return pick(await res.json(), ["login", "avatar_url", "html_url", "bio"]);
};

export const getRepos = async (
  username?: string
): Promise<Types.Repositories.Repo[]> => {
  invariant(username, "Please provide an username as string");
  const res = await fetch(
    `https://api.github.com/users/${username}/repos`,
    config
  );
  const data = await res.json();
  return data.map((repo: Types.Repositories.Repo) =>
    pick(repo, [
      "id",
      "name",
      "full_name",
      "stargazers_count",
      "html_url",
      "language",
      "location",
    ])
  );
};

export const getCommits = async (
  username?: string,
  reponame?: string
): Promise<Types.Commits.Commit[]> => {
  invariant(reponame, "Please provide an repository name as a string");
  invariant(username, "Please provide an username as a string");

  const res = await fetch(
    `https://api.github.com/repos/${username}/${reponame}/commits`,
    config
  );

  const data = await res.json();

  return data.map((commit: Types.Commits.ApiResponse) => ({
    sha: commit.sha,
    message: commit.commit.message,
    html_url: commit.html_url,
  }));
};
