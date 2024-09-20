export type TResource = {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  classroom?: number;
};

export type TAddResourceInfoDto = {
  title: string;
  description: string;
};
