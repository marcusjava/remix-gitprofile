import { Types } from "..";
import Commit from "./Commit";

interface Props {
  user: Types.User;
  commits: Types.Commits.Commit[];
  reponame?: string;
}

export default function Commits({ user, commits, reponame }: Props) {
  return (
    <div className="pl-6 lg:w-80">
      <div className="pt-6 pb-2">
        <h2 className="text-md font-medium">Commits for {reponame}</h2>
      </div>
      <div>
        <ul className="divide-y divide-gray-200">
          {commits.map((commit: Types.Commits.Commit) => (
            <Commit key={commit.sha} commit={commit} user={user} />
          ))}
        </ul>
        <div className="py-4 text-sm border-t border-gray-200">
          <a
            href="#"
            className="text-indigo-600 font-semibold hover:text-indigo-900"
          >
            View all commits <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
