export interface ICreateClassroomModalProps {
  opened: boolean;
  close: () => void;
}

export type TCreateClassroomFormData = {
  title: string;
  subject: string;
  classTime: string;
  days: Array<string>;
};

export type TClassroomDetailsDto = {
  title: string;
  subject: string;
  classTime: Date;
  days: Array<string>;
};
