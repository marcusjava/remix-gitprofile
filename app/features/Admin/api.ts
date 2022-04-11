import { db } from "~/utils/db.server";
import { Course } from "@prisma/client";
import { FormFields } from "~/routes/admin.courses/new";

export const getCourses = async (): Promise<Course[]> => {
  return db.course.findMany();
};

export const getCourse = async (id: string): Promise<Course | null> => {
  return db.course.findUnique({ where: { id } });
};

export const deleteCourse = async (id: string): Promise<Course> => {
  return db.course.delete({ where: { id } });
};

export const saveCourse = async (
  data: FormFields,
  id?: string
): Promise<Course> => {
  if (id) {
    return await db.course.update({ where: { id }, data });
  }
  return await db.course.create({
    data,
  });
};
