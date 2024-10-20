import { ERole } from "@/shared/typedefs";

export type TLoginRequestFields = {
  email: string;
  password: string;
};

export type TTokenizedUser = {
  id: number;
  claim: ERole;
  email: string;
  firstName: string;
};

export type TLoginResponse = {
  accessToken: string;
  user: TTokenizedUser;
};
