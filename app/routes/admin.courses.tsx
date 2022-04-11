import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Course } from "@prisma/client";
import { CourseApi } from "~/features/Admin";
import Courses from "~/features/Admin/components/Courses";

interface LoaderData {
  courses: Course[];
}

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const courses = await CourseApi.getCourses();
  return {
    courses,
  };
};

export const action: ActionFunction = async ({ request, params }) => {
  return {};
};

export default function Admin() {
  const { courses } = useLoaderData<LoaderData>();
  return (
    <>
      <Courses courses={courses} />
    </>
  );
}

export const ErrorBoundary = () => <h4>Error!</h4>;
export const CatchBoundary = () => <h4>Not found!</h4>;
