import { ActionFunction, redirect } from "@remix-run/node";
import { CourseApi } from "~/features/Admin";

export const action: ActionFunction = async ({ params }): Promise<Response> => {
  await CourseApi.deleteCourse(params.courseId!);
  //voltando pra quem chamou
  return redirect("..");
};
