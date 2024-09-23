import { ERole } from "@/shared/typedefs";

export type TMessage = {
  message: string;
  attachmentUrl?: string;
  sender: {
    id: number;
    firstName: string;
    lastName: string;
    role: ERole;
  };
  classroom?: number;
  createdAt: Date;
};

export type TCreateMessageDto = {
  message: string;
  sender: number | null;
};
