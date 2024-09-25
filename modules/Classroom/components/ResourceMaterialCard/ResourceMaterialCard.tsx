import { Box, Button, Flex, Text, Title } from "@mantine/core";
import { FaBook, FaFilePdf } from "react-icons/fa";

import { useResourceCardStyles } from "./ResourceMaterialCard.styles";
import { TResourceMaterialCardType } from "./ResourceMaterialCard.types";

const ResourceMaterialCard = ({ resource }: TResourceMaterialCardType) => {
  const { classes } = useResourceCardStyles();

  const handleOpenFile = () => {
    // TODO: trigger file download
    window.open(resource.fileUrl, "_blank");
  };

  return (
    <Box className={classes.card}>
      <Flex align={"center"} gap={8}>
        <Box className={classes.icon}>{<FaBook />}</Box>
        <Title order={5}>{resource.title}</Title>
      </Flex>
      <Text size={"sm"}>{resource.description}</Text>
      <Flex justify={"end"}>
        <Button
          className={classes.downloadButton}
          rightIcon={<FaFilePdf />}
          onClick={handleOpenFile}
        >
          Download
        </Button>
      </Flex>
    </Box>
  );
};

export default ResourceMaterialCard;
