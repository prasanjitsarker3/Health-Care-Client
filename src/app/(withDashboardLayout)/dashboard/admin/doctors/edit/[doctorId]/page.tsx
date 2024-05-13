"use client";
import React from "react";
type IParams = {
  params: {
    doctorId: string;
  };
};

const DoctorUpdatePage = ({ params }: IParams) => {
  console.log(params.doctorId);
  return (
    <div>
      <h1>Doctor Update:{params?.doctorId}</h1>
    </div>
  );
};

export default DoctorUpdatePage;
