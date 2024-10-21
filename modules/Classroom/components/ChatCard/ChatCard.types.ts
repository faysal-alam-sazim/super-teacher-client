import { TMessage } from "@/shared/redux/rtk-apis/messages/messages.types";

export type TChatCardProps = {
  message: TMessage;
  classroomId: number;
};
