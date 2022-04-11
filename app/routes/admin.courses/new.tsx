import { ActionFunction, redirect } from "@remix-run/node";
import { ZodError } from "zod";
import { useActionData } from "@remix-run/react";
import { FormValidator, FormValidatorErrors } from "~/util";
import NewCourse from "~/features/Admin/components/NewCourse";
import { saveCourse } from "~/features/Admin/api";

export interface FormFields {
  name: string;
  description: string;
}

export interface ActionData {
  formErrors?: Partial<FormFields>;
  formValues?: Partial<FormFields>;
}

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData | Response | void> => {
  const input = Object.fromEntries(await request.formData());
  try {
    await saveCourse(FormValidator(input));
    return redirect(".");
  } catch (error: any) {
    //console.error(error);
    if (error instanceof ZodError) {
      return {
        formValues: input,
        formErrors: FormValidatorErrors(error),
      };
    }
    throw new Error(error.message);
  }
};

export default function () {
  const actionData = useActionData<ActionData>();

  return <NewCourse actionData={actionData} />;
}
