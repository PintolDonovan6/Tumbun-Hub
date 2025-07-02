import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Select,
  useToast,
  IconButton,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  { name: 'Mon', followers: 1000, engagement: 2 },
  { name: 'Tue', followers: 2000, engagement: 4 },
  { name: 'Wed', followers: 3000, engagement: 6 },
  { name: 'Thu', followers: 4000, engagement: 8 },
  { name: 'Fri', followers: 4580, engagement: 15 },
  { name: 'Sat', followers: 2000, engagement: 4 },
  { name: 'Sun', followers: 1500, engagement: 3 },
];

function App() {
  const [suggestion, setSuggestion] = useState('');
  const toast = useToast();

  const handleGenerate = async () => {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
      });
      const data = await response.json();
      if (response.ok) {
        setSuggestion(data.suggestion);
      } else {
        throw new Error(data.error || 'Failed to fetch');
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to fetch AI suggestion',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <Box p={6} maxW="1000px" mx="auto">
        <HStack justify="space-between">
          <Heading size="lg">Tumbuna Hub Dashboard</Heading>
          <HStack>
            <IconButton icon={<SunIcon />} aria-label="Light" />
            <IconButton icon={<MoonIcon />} aria-label="Dark" />
          </HStack>
        </HStack>

        <HStack mt={4} spacing={8}>
          <VStack>
            <Text fontSize="2xl" fontWeight="bold">Followers</Text>
            <Text fontSize="xl">4,580</Text>
          </VStack>
          <VStack>
            <Text fontSize="2xl" fontWeight="bold">Engagement Rate</Text>
            <Text fontSize="xl">15%</Text>
          </VStack>
          <VStack>
            <Text fontSize="2xl" fontWeight="bold">Reach</Text>
            <Text fontSize="xl">18,300</Text>
          </VStack>
        </HStack>

        <Box mt={6}>
          <Text fontWeight="bold" mb={2}>View stats for:</Text>
          <Select maxW="200px" defaultValue="7days">
            <option value="7days">Last 7 Days</option>
            <option value="14days">Last 14 Days</option>
            <option value="30days">Last 30 Days</option>
          </Select>
        </Box>

        <Box mt={6}>
          <LineChart width={900} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" label={{ value: 'Followers', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: 'Engagement %', angle: -90, position: 'insideRight' }} />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="followers" stroke="#3182ce" activeDot={{ r: 8 }} />
            <Line yAxisId="right" type="monotone" dataKey="engagement" stroke="#e53e3e" />
          </LineChart>
        </Box>

        <Box mt={10}>
          <Heading size="md" mb={2}>AI Post Suggestions</Heading>
          <Text mb={4}>Click the button to get a fresh AI-generated post idea.</Text>
          <Button colorScheme="blue" onClick={handleGenerate}>Generate Post Idea</Button>
          {suggestion && (
            <Box mt={4} p={4} bg="gray.100" borderRadius="md">
              <Text>{suggestion}</Text>
            </Box>
          )}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
