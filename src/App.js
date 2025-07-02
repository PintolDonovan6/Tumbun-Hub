import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  useColorMode,
  IconButton,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, CopyIcon } from '@chakra-ui/icons';
import axios from 'axios';

function Dashboard() {
  const [followers] = useState(4560);
  const [engagementRate] = useState(12.5);
  const [reach] = useState(18300);

  const [postSuggestions, setPostSuggestions] = useState([
    "Try a behind-the-scenes video of your latest event to boost engagement.",
    "Use hashtags #TumbunaHub #PNGContent to reach a wider audience.",
  ]);
  const [loading, setLoading] = useState(false);

  const { colorMode, toggleColorMode } = useColorMode();

  const generatePostSuggestion = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/generate');
      if (response.data && response.data.suggestion) {
        setPostSuggestions((prev) => [response.data.suggestion, ...prev]);
      }
    } catch (error) {
      alert('Failed to generate post suggestion');
    }
    setLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <Box p={6} maxW="900px" mx="auto">
      <HStack justify="space-between" mb={6}>
        <Heading color="teal.600">Tumbuna Hub Dashboard</Heading>
        <IconButton
          aria-label="Toggle Dark Mode"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
      </HStack>

      <HStack spacing={12} mb={8} justify="space-between">
        <Box bg="gray.100" p={4} borderRadius="md" flex="1" textAlign="center">
          <Text fontWeight="bold" fontSize="lg">Followers</Text>
          <Text fontSize="3xl" color="teal.700">{followers.toLocaleString()}</Text>
        </Box>
        <Box bg="gray.100" p={4} borderRadius="md" flex="1" textAlign="center">
          <Text fontWeight="bold" fontSize="lg">Engagement Rate</Text>
          <Text fontSize="3xl" color="teal.700">{engagementRate}%</Text>
        </Box>
        <Box bg="gray.100" p={4} borderRadius="md" flex="1" textAlign="center">
          <Text fontWeight="bold" fontSize="lg">Reach</Text>
          <Text fontSize="3xl" color="teal.700">{reach.toLocaleString()}</Text>
        </Box>
      </HStack>

      <VStack align="start" spacing={4}>
        <Heading size="md" color="teal.600">AI Post Suggestions</Heading>

        {postSuggestions.map((suggestion, idx) => (
          <HStack key={idx} justify="space-between" w="100%" bg="gray.50" p={3} borderRadius="md">
            <Text>{suggestion}</Text>
            <IconButton
              aria-label="Copy suggestion"
              icon={<CopyIcon />}
              size="sm"
              onClick={() => copyToClipboard(suggestion)}
            />
          </HStack>
        ))}

        <Button
          colorScheme="teal"
          mt={2}
          onClick={generatePostSuggestion}
          isLoading={loading}
        >
          Generate Post Idea
        </Button>
      </VStack>
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
