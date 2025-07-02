import React from 'react';
import { ChakraProvider, Box, Heading, Text, VStack, HStack, Button } from '@chakra-ui/react';

function Dashboard() {
  return (
    <Box p={6} maxW="900px" mx="auto">
      <Heading mb={6} color="teal.600">Tumbuna Hub Dashboard</Heading>

      <HStack spacing={12} mb={8} justify="space-between">
        <Box bg="gray.100" p={4} borderRadius="md" flex="1" textAlign="center">
          <Text fontWeight="bold" fontSize="lg">Followers</Text>
          <Text fontSize="3xl" color="teal.700">4,560</Text>
        </Box>
        <Box bg="gray.100" p={4} borderRadius="md" flex="1" textAlign="center">
          <Text fontWeight="bold" fontSize="lg">Engagement Rate</Text>
          <Text fontSize="3xl" color="teal.700">12.5%</Text>
        </Box>
        <Box bg="gray.100" p={4} borderRadius="md" flex="1" textAlign="center">
          <Text fontWeight="bold" fontSize="lg">Reach</Text>
          <Text fontSize="3xl" color="teal.700">18,300</Text>
        </Box>
      </HStack>

      <VStack align="start" spacing={4}>
        <Heading size="md" color="teal.600">AI Post Suggestions</Heading>
        <Text>“Try a behind-the-scenes video of your latest event to boost engagement.”</Text>
        <Text>“Use hashtags #TumbunaHub #PNGContent to reach a wider audience.”</Text>
        <Button colorScheme="teal" mt={2} alignSelf="flex-start">See All Suggestions</Button>
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

