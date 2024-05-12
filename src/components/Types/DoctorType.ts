import { IMetaData } from "@/Axios/Types/common";

export const Gender = ["MALE", "FEMALE"];

export type IDoctorData = {
  id: string;
  name: string;
  email: string;
  profilePhoto: string | null;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number;
  gender: "MALE" | "FEMALE";
  appointmentFree: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  averageRating: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  doctorSpecialties: string[];
};
export type DoctorResponse = {
  data: IDoctorData[];
  meta: IMetaData;
};
