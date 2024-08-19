import { TStudentRegistrationFormData } from "../components/StudentRegistrationForm/StudentRegistrationForm.schema";

const onSubmit = (data: TStudentRegistrationFormData) => {
  console.log(data);
};

export { onSubmit };
