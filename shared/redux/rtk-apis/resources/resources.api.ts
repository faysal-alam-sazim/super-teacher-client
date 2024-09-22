import { TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import { TAddResourceInfoDto, TEditResourceInfoDto, TResource } from "./resources.types";

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

    updateResource: builder.mutation<
      TResource,
      {
        classroomId: number;
        editResourceInfo: TEditResourceInfoDto;
        resourceFile: File;
        resourceId: number;
      }
    >({
      query: ({ classroomId, editResourceInfo, resourceFile, resourceId }) => {
        const formData = new FormData();
        formData.append("file", resourceFile);

        Object.entries(editResourceInfo).forEach(([key, value]) => {
          formData.append(key, value);
        });

        return {
          url: `classrooms/${classroomId}/resources/${resourceId}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: (_result, _error, { classroomId }) => [
        { type: "ClassroomResources", classroomId },
      ],
      transformResponse: (response: TApiResponse<TResource>) => response.data,
    }),
  }),
});

export const { useGetResourceMaterialsQuery, useAddResourceMutation, useUpdateResourceMutation } =
  resourcesApi;
