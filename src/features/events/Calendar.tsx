import { Box, Grid, Heading, HStack, IconButton } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";
import { getMonthYearDetails, getNewMonthYear } from "./utilities/monthYear";
import { DateBox } from "./DateBox";
import { fetchEvents } from "./utilities/fetchEvents";
import { EventsDateMap } from "./types";

export const Calendar = () => {
  const [events, setEvents] = useState<EventsDateMap>({});
  const currentMonthYear = getMonthYearDetails(dayjs());
  const [monthYear, setMonthYear] = useState(currentMonthYear);

  const incrementMonthYear = async (monthIncrement: number): Promise<void> => {
    const nextMonthYear = getNewMonthYear(monthYear, monthIncrement);
    await fetchData(nextMonthYear);
    setMonthYear(nextMonthYear);
  };

  const fetchData = async (newMonthYear) => {
    const response = await fetchEvents(newMonthYear);
    setEvents(response);
  };

  useEffect(() => {
    fetchData(monthYear);
  }, []);

  return (
    <Box>
      <Heading
        size="2xl"
        py={5}
        bgGradient="linear(to-b, gray.50, gray.200)"
        textAlign="center"
      >
        Everett Events
      </Heading>
      <Box id="calendar-grid" py={10} bgColor="gray.300">
        <HStack spacing={8} justify="center">
          <IconButton
            aria-label="previous month"
            onClick={() => incrementMonthYear(-1)}
            icon={<TiArrowLeftThick />}
          />
          <Heading
            size="xl"
            bg="gray.200"
            minW="40%"
            rounded="lg"
            textAlign="center"
          >
            {monthYear.monthName} {monthYear.year}
          </Heading>
          <IconButton
            aria-label="next month"
            onClick={() => incrementMonthYear(1)}
            icon={<TiArrowRightThick />}
          />
        </HStack>
        <Grid
          templateColumns="repeat(7, minmax(0, 1fr))"
          gap={4}
          my={5}
          mx={10}
        >
          <DateBox
            date={1}
            gridColumn={monthYear.firstDOW + 1}
            events={events[1]}
          />
          {[...Array(monthYear.lastDate)].map((_, i) =>
            i > 0 ? (
              <DateBox key={i} date={i + 1} events={events[i + 1]} />
            ) : null
          )}
        </Grid>
      </Box>
    </Box>
  );
};
