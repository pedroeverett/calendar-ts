import React from "react";
import { Box, Stack, Text } from "@chakra-ui/react";
import { Event as EventType } from "./types";
import { Event } from "./Event";

type DateBoxProps = {
  date: number;
  gridColumn?: number;
  events?: EventType[];
};

export const DateBox = ({ date, gridColumn, events }: DateBoxProps) => {
  const sortedEvents = events.sort(
    (a, b) => a.startTime.getHours() - b.startTime.getHours()
  );

  return (
    <Box
      w="100%"
      h={20}
      bg="gray.50"
      gridColumnStart={gridColumn}
      boxShadow="md"
      rounded="md"
    >
      <Stack margin="2" spacing="1">
        <Text fontSize="xs" textAlign="right">
          {date}
        </Text>
        {sortedEvents.map((event) => (
          <Event key={event.id} eventData={event} />
        ))}
      </Stack>
    </Box>
  );
};

DateBox.defaultProps = { gridColumn: null, events: [] };
