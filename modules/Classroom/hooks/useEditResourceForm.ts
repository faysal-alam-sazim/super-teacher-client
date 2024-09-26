import { showNotification } from "@mantine/notifications";

import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import { useUpdateResourceMutation } from "@/shared/redux/rtk-apis/resources/resources.api";
import { TEditResourceInfoDto } from "@/shared/redux/rtk-apis/resources/resources.types";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import { TEditResourceFormData } from "../components/EditResourceModal/EditResourceModal.types";

const useEditResourceForm = (classroomId: number) => {
  const [updateResource, { isLoading }] = useUpdateResourceMutation();

  const onSubmit = async (data: TEditResourceFormData, resourceId: number) => {
    const editResourceInfo: TEditResourceInfoDto = {
      title: data?.title,
      description: data?.description,
    };

    try {
      await updateResource({
        classroomId,
        editResourceInfo,
        resourceFile: data.uploadFile,
        resourceId,
      }).unwrap();

      showNotification({
        title: "Success",
        message: "Resource Updated Successfully!",
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

export default useEditResourceForm;
