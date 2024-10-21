import { TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import { TCreateMessageDto, TMessage } from "./messages.types";

const messagesApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMessages: builder.query<TMessage[], string>({
      query: (id) => `classrooms/${id}/messages`,
      providesTags: (_result, _error, id) => [{ type: "ClassroomMessages", id }],
      transformResponse: (response: TApiResponse<TMessage[]>) => response.data,
    }),

    getAttachmentDownloadUrl: builder.query<string, { classroomId: number; messageId: number }>({
      query: ({ classroomId, messageId }) => `classrooms/${classroomId}/messages/${messageId}`,
      transformResponse: (response: TApiResponse<string>) => response.data,
    }),

    addMessage: builder.mutation<
      TMessage,
      { id: number; newMessage: TCreateMessageDto; attachment: File | null }
    >({
      query: ({ id, newMessage, attachment }) => {
        const formData = new FormData();

        if (attachment) {
          formData.append("file", attachment);
        }

        formData.append("message", newMessage.message);
        formData.append("sender", newMessage.sender.toString());

        return {
          url: `classrooms/${id}/messages`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: "ClassroomMessages", id: id }],
      transformResponse: (response: TApiResponse<TMessage>) => response.data,
    }),
  }),
});

export const {
  useGetAllMessagesQuery,
  useAddMessageMutation,
  useLazyGetAttachmentDownloadUrlQuery,
} = messagesApi;
