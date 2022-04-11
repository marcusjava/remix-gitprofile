import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Course } from "@prisma/client";
import { ZodError } from "zod";
import { useActionData, useLoaderData } from "@remix-run/react";
import { FormValidator, FormValidatorErrors } from "~/util";
import NewCourse from "~/features/Admin/components/NewCourse";
import { saveCourse, getCourse } from "~/features/Admin/api";
import { Error, NotFound } from "~/components";

export interface FormFields {
  name: string;
  description: string;
}

export interface ActionData {
  formErrors?: Partial<FormFields>;
  formValues?: Partial<FormFields>;
}

interface LoaderProps {
  course: Course;
}

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderProps | Response> => {
  const course = await getCourse(params.courseId!);

  if (!course) {
    throw new Response("Not found", {
      status: 404,
    });
  }

  return { course };
};

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | Response | void> => {
  const input = Object.fromEntries(await request.formData());
  try {
    await saveCourse(FormValidator(input), params.courseId);
    return redirect(".");
  } catch (error: any) {
    //console.error(error);
    if (error instanceof ZodError) {
      return {
        formValues: input,
        formErrors: FormValidatorErrors(error),
      };
    }
    //@ts-ignore
    throw new Error(error.message);
  }
};

export default function () {
  const { course } = useLoaderData<LoaderProps>();
  const actionData = useActionData<ActionData>();

  return (
    <>
      <form action={`${course.id}/delete`} method="post">
        <button
          type="submit"
          className="bg-red-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Excluir
        </button>
      </form>
      <NewCourse actionData={actionData} course={course} />
    </>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}

export function CatchBoundary() {
  return <NotFound message="We couldn'd find a course with provided ID" />;
}
