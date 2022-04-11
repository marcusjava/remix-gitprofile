import { z, ZodError } from "zod";

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export function date(date: Date): string {
  return new Intl.DateTimeFormat("pt-br", {
    timeStyle: "short",
    dateStyle: "full",
  }).format(new Date(date));
}

interface InputFields {
  name?: string;
  description?: string;
}

const Validator = z.object({
  name: z.string().min(6, "O nome deve ter no minimo 6 caracteres!"),
  description: z
    .string()
    .min(12, "A descrição deve ter no minimo 12 caracteres")
    .max(30, "A descrição deve ter no maximo 30 caracteres"),
});

export const FormValidator = (input: InputFields) => {
  return Validator.parse(input);
};

export const FormValidatorErrors = (error: ZodError) => {
  return error.issues.reduce((acc, issue) => {
    //@ts-ignore
    acc[issue.path[0]] = issue.message;
    return acc;
  }, {});
};
