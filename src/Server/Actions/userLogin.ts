"use server";

import { FieldValues } from "react-hook-form";

export const userLogin = async (formData: FieldValues) => {
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
