import { Box, Flex, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { LuClipboard } from "react-icons/lu";

import { EDateFormat } from "@/shared/typedefs";

import { useExamCardStyles } from "./ExamCard.styles";
import { TExamCardProps } from "./ExamCard.types";

const ExamCard = ({ exam }: TExamCardProps) => {
  const { classes } = useExamCardStyles(exam.date);

  const dueDateObject = dayjs(exam.date);
  const isPastDueDate = dueDateObject.isBefore(dayjs());

  return (
    <Box className={classes.card}>
      <Flex justify={"space-between"}>
        <Flex align={"center"} gap={8}>
          <Box className={classes.icon}>{<LuClipboard />}</Box>
          <Title order={5}>
            {exam.title} {isPastDueDate ? "(ended)" : null}
          </Title>
        </Flex>
      </Flex>
      <Text size={"sm"}>{exam.instruction}</Text>
      <Box className={classes.cardEnd}>
        <Text>
          <strong>{isPastDueDate ? "Finished on:" : "Scheduled for:"}</strong>{" "}
          {dayjs(exam.date).format(EDateFormat.SHORT)}
        </Text>
      </Box>
    </Box>
  );
};

export default ExamCard;
