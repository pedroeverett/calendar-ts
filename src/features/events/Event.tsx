import { Box, HStack, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { Event as EventType, EventCategory } from "./types";

type EventProps = {
  eventData: EventType;
};

export const Event = ({ eventData }: EventProps) => {
  const eventStart = dayjs(eventData.startTime).format("HH:mm");
  const getColorByCategory = (category: EventCategory): string => {
    const colorByCategory = {
      webinar: "blue.700",
      conference: "red.700",
      "town hall": "green.700",
    };
    return colorByCategory[category] ?? "black";
  };

  return (
    <Box
      borderRadius="lg"
      px={2}
      bg={getColorByCategory(eventData.category)}
      color="white"
    >
      <HStack justify="space-between">
        <Text as="span" fontSize="xs">
          {eventStart}
        </Text>
        <Text as="span" fontSize="xs" isTruncated>
          {eventData.eventName}
        </Text>
      </HStack>
    </Box>
  );
};
