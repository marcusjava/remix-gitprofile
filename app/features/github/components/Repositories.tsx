import React from "react";

import { Outlet } from "@remix-run/react";
import { Types } from "..";

import Repository from "./Repository";
import NavBar from "../layouts/NavBar";
import SideBar from "../layouts/SideBar";
import Projects from "../layouts/Projects";

export interface RepositoriesProps {
  user: Types.User;
  repos: Types.Repositories.Repo[];
  children?: React.ReactChild;
}

export function Repositories({ user, repos, children }: RepositoriesProps) {
  return (
    <>
      <div
        className="fixed top-0 left-0 w-1/2 h-full bg-white"
        aria-hidden="true"
      />
      <div
        className="fixed top-0 right-0 w-1/2 h-full bg-gray-50"
        aria-hidden="true"
      />
      <div className="relative min-h-full flex flex-col">
        <NavBar user={user} />
        <div className="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex">
          <div className="flex-1 min-w-0 bg-white xl:flex">
            <SideBar user={user} repos={repos} />
            <Projects>
              {repos.map((repo) => (
                <Repository key={repo.id} repo={repo} />
              ))}
            </Projects>
          </div>
          <div className="bg-gray-50 pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
