import { TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import { TAddResourceInfoDto, TResource } from "./resources.types";

const resourcesApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getResourceMaterials: builder.query<TResource[], number>({
      query: (id) => `classrooms/${id}/resources`,
      providesTags: (_result, _error, id) => [{ type: "ClassroomResources", id }],
      transformResponse: (response: TApiResponse<TResource[]>) => response.data,
    }),

    addResource: builder.mutation<
      TResource,
      { id: number; newResourceInfo: TAddResourceInfoDto; resourceFile: File }
    >({
      query: ({ id, newResourceInfo, resourceFile }) => {
        const formData = new FormData();
        formData.append("file", resourceFile);
        formData.append("title", newResourceInfo.title);
        formData.append("description", newResourceInfo.description);

        return {
          url: `classrooms/${id}/resources`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: "ClassroomResources", id }],
      transformResponse: (response: TApiResponse<TResource>) => response.data,
    }),
  }),
});

export const { useGetResourceMaterialsQuery, useAddResourceMutation } = resourcesApi;
