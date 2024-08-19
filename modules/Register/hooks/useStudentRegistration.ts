import { TStudentRegistrationFormData } from "../components/StudentRegistrationForm/StudentRegistrationForm.types";

const useStudentRegistration = () => {
  const onSubmit = (data: TStudentRegistrationFormData) => {
    // TO DO: remove when add api call
    console.log(data);
  };

  return { onSubmit };
};

export default useStudentRegistration;
