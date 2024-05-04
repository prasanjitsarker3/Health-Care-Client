"use server";

import { IPatientLogin } from "@/app/login/page";

export const userLogin = async (formData: IPatientLogin) => {
  const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    cache: "no-store",
  });
  const userInfo = await res.json();
  return userInfo;
};
