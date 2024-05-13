"use client";

import { FieldValues } from "react-hook-form";

export const userLogin = async (formData: FieldValues) => {
  const res = await fetch(`http://localhost:5000/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    // cache: "no-store",
    credentials: "include",
  });
  const userInfo = await res.json();
  return userInfo;
};
