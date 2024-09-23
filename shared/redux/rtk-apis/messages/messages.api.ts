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

    addMessage: builder.mutation<TMessage, { id: number; newMessage: TCreateMessageDto }>({
      query: ({ id, ...rest }) => ({
        url: `classrooms/${id}/messages`,
        method: "POST",
        body: rest.newMessage,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "ClassroomMessages", id: id }],
      transformResponse: (response: TApiResponse<TMessage>) => response.data,
    }),
  }),
});

export const { useGetAllMessagesQuery, useAddMessageMutation } = messagesApi;
