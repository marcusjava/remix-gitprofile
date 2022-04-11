import { Types } from "..";

type Props = {
  commit: Types.Commits.Commit;
  user: Types.User;
};

export default function Commit({ user, commit }: Props) {
  return (
    <li key={commit.sha} className="py-4">
      <a href={commit.html_url} target="_blank" rel="noreferrer">
        <div className="flex space-x-3">
          <img
            className="h-6 w-6 rounded-full"
            src={user.avatar_url}
            alt={user.login}
          />
          <div className="flex-1 space-y-1">
            <h3 className="text-sm font-medium">{user.login}</h3>
            <p className="text-sm text-gray-500">{commit.message}</p>
          </div>
        </div>
      </a>
    </li>
  );
}
