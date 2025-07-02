import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Select,
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const mockData = {
  daily: [
    { date: "Mon", followers: 4500, engagement: 11, reach: 17000 },
    { date: "Tue", followers: 4520, engagement: 12, reach: 17200 },
    { date: "Wed", followers: 4540, engagement: 13, reach: 17500 },
    { date: "Thu", followers: 4550, engagement: 12.5, reach: 17700 },
    { date: "Fri", followers: 4560, engagement: 13, reach: 18000 },
    { date: "Sat", followers: 4570, engagement: 14, reach: 18200 },
    { date: "Sun", followers: 4580, engagement: 15, reach: 18300 },
  ],
  weekly: [
    { date: "Week 1", followers: 4300, engagement: 10, reach: 16000 },
    { date: "Week 2", followers: 4400, engagement: 11, reach: 16500 },
    { date: "Week 3", followers: 4500, engagement: 12, reach: 17000 },
    { date: "Week 4", followers: 4600, engagement: 13, reach: 18000 },
  ],
  monthly: [
    { date: "Jan", followers: 4000, engagement: 9, reach: 15000 },
    { date: "Feb", followers: 4200, engagement: 10, reach: 15500 },
    { date: "Mar", followers: 4400, engagement: 11, reach: 16500 },
    { date: "Apr", followers: 4600, engagement: 13, reach: 17500 },
  ],
};

function Dashboard() {
  const [range, setRange] = useState("daily");
  const data = mockData[range];
  const latest = data[data.length - 1];

  return (
    <Box p={6} maxW="900px" mx="auto">
      <Heading mb={6} color="teal.600">
        Tumbuna Hub Dashboard
      </Heading>

      <HStack spacing={12} mb={8} justify="space-between">
        <Box
          bg="gray.100"
          p={4}
          borderRadius="md"
          flex="1"
          textAlign="center"
          boxShadow="md"
        >
          <Text fontWeight="bold" fontSize="lg">
            Followers
          </Text>
          <Text fontSize="3xl" color="teal.700">
            {latest.followers.toLocaleString()}
          </Text>
        </Box>
        <Box
          bg="gray.100"
          p={4}
          borderRadius="md"
          flex="1"
          textAlign="center"
          boxShadow="md"
        >
          <Text fontWeight="bold" fontSize="lg">
            Engagement Rate
          </Text>
          <Text fontSize="3xl" color="teal.700">
            {latest.engagement}%
          </Text>
        </Box>
        <Box
          bg="gray.100"
          p={4}
          borderRadius="md"
          flex="1"
          textAlign="center"
          boxShadow="md"
        >
          <Text fontWeight="bold" fontSize="lg">
            Reach
          </Text>
          <Text fontSize="3xl" color="teal.700">
            {latest.reach.toLocaleString()}
          </Text>
        </Box>
      </HStack>

      <HStack mb={4} spacing={4}>
        <Text>View stats for:</Text>
        <Select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          maxW="150px"
          size="sm"
        >
          <option value="daily">Last 7 Days</option>
          <option value="weekly">Last 4 Weeks</option>
          <option value="monthly">Last 4 Months</option>
        </Select>
      </HStack>

      <Box w="100%" h="300px" bg="white" p={4} borderRadius="md" boxShadow="md">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" domain={["dataMin - 100", "dataMax + 100"]} />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={["dataMin - 2", "dataMax + 2"]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="followers"
              stroke="#3182CE"
              activeDot={{ r: 8 }}
              name="Followers"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="engagement"
              stroke="#38A169"
              name="Engagement %"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ChakraProvider>
      <Dashboard />
    </ChakraProvider>
  );
}

export default App;
