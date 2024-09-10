import React from "react";

import { Card, Image, Text, Badge, Flex } from "@mantine/core";
import dayjs from "dayjs";

import classes from "./ClassroomCard.module.css";
import { TClassroomCardProps } from "./ClassroomCard.types";

const ClassroomCard = ({ title, subject, days, classTime }: TClassroomCardProps) => (
  <Card shadow="sm" padding="lg" radius="md" withBorder w={"350px"} className={classes["card"]}>
    <Card.Section>
      <Image src="bg_classroom.png" height={160} alt="Norway" />
    </Card.Section>

    <Flex justify="space-between" mt="md" mb="xs" wrap={"wrap"} gap={8}>
      <Text fw={400}>{title}</Text>
      <Badge color="pink" px={48}>
        {subject}
      </Badge>
    </Flex>

    <Text size="sm">
      <span style={{ fontWeight: "bold" }}>Days:</span> {days.join(", ")}
    </Text>
    <Text size="sm">
      <span style={{ fontWeight: "bold" }}>Class Time:</span> {dayjs(classTime).format("hh:mm A")}
    </Text>
  </Card>
);

export default ClassroomCard;
