import { Box, Flex, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";

import LoadingComponent from "@/shared/components/LoadingComponent";
import { useGetResourceMaterialsQuery } from "@/shared/redux/rtk-apis/resources/resources.api";

import ResourceMaterialCard from "../../components/ResourceMaterialCard/ResourceMaterialCard";
import { useResourcesStyles } from "./ClassroomResourcesContainer.styles";
import { TClassroomResourcesContainerProps } from "./ClassroomResourcesContainer.types";

const ClassroomResourcesContainer = ({ classroomId }: TClassroomResourcesContainerProps) => {
  const { classes } = useResourcesStyles();
  const [isMaterialsOpened, { toggle: materialsToggle }] = useDisclosure(false);
  const { data: fetchedMaterials, isLoading: isMaterialsLoading } = useGetResourceMaterialsQuery(
    classroomId,
    { skip: !classroomId },
  );

  return (
    <>
      <Title className={classes.heading} order={3}>
        Uploaded Resources
      </Title>
      <Box>
        <Flex align={"center"} gap={12} mt={12}>
          {isMaterialsOpened ? (
            <FaAngleDown className={classes.icon} onClick={materialsToggle} />
          ) : (
            <FaAngleRight className={classes.icon} onClick={materialsToggle} />
          )}
          <Title order={4}>Materials</Title>
        </Flex>
        {isMaterialsLoading ? (
          <LoadingComponent visible />
        ) : (
          <Box className={classes.cardsContainer}>
            {isMaterialsOpened && fetchedMaterials?.length === 0 ? (
              <Text>No resources uploaded</Text>
            ) : null}
            {isMaterialsOpened
              ? fetchedMaterials?.map((material) => (
                  <ResourceMaterialCard key={material.id} resource={material} />
                ))
              : null}
          </Box>
        )}
      </Box>
    </>
  );
};

export default ClassroomResourcesContainer;
