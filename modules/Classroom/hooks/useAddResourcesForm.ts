import { showNotification } from "@mantine/notifications";

import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import { useAddResourceMutation } from "@/shared/redux/rtk-apis/resources/resources.api";
import { TAddResourceInfoDto } from "@/shared/redux/rtk-apis/resources/resources.types";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import { TAddResourceFormData } from "../components/AddResourceModal/AddResourceModal.types";

const useAddResourcesForm = (classroomId: number) => {
  const [addResource, { isLoading }] = useAddResourceMutation();

  const onSubmit = async (data: TAddResourceFormData) => {
    const newResourceInfo: TAddResourceInfoDto = {
      title: data.title,
      description: data.description,
    };

    try {
      await addResource({
        id: classroomId,
        newResourceInfo,
        resourceFile: data.uploadFile,
      }).unwrap();

      showNotification({
        title: "Success",
        message: "Resource Added Successfully!",
        autoClose: NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS,
        color: "green",
      });
    } catch (error) {
      const errorMessage = parseApiErrorMessage(error);

      showNotification({
        title: "Error",
        message: errorMessage,
        autoClose: NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS,
        color: "red",
      });
    }
  };

  return { onSubmit, isLoading };
};

export default useAddResourcesForm;
