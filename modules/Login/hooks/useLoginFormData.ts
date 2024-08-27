import { TLoginFormData } from "../components/LoginForm.types";

const useLoginFormData = () => {
  const onSubmit = (data: TLoginFormData) => {
    // TO DO: will remove it later after integrating api call
    console.log(data);
  };

  return { onSubmit };
};

export default useLoginFormData;
