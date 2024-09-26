import { TResource } from "@/shared/redux/rtk-apis/resources/resources.types";

export type TEditResourceModalProps = {
  opened: boolean;
  close: () => void;
  classroomId: number;
  resource: TResource;
};

export type TEditResourceFormData = {
  title: string;
  description: string;
  uploadFile: File;
};
