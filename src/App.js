import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

function Dashboard() {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.100', 'gray.800');

  const toggleSuggestions = () => setShowSuggestions(!showSuggestions);

  return (
    <ChakraProvider>
      <Box p={6} maxW="900px" mx="auto" bg={bg} minH="100vh">
        <HStack justify="space-between" mb={4}>
          <Heading>Tumbuna Hub Dashboard</Heading>
          <Button onClick={toggleColorMode}>
            <SunIcon boxSize={5} mr={2} />
            <MoonIcon boxSize={5} />
          </Button>
        </HStack>

        <HStack spacing={8} mb={6}>
          <Stat>
            <StatLabel>Followers</StatLabel>
            <StatNumber>4,560</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Engagement Rate</StatLabel>
            <StatNumber>12.5%</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Reach</StatLabel>
            <StatNumber>18,300</StatNumber>
          </Stat>
        </HStack>

        <Button colorScheme="teal" onClick={toggleSuggestions} mb={4}>
          {showSuggestions ? 'Hide Suggestions' : 'See All Suggestions'}
        </Button>

        {showSuggestions && (
          <VStack align="start" spacing={3} mt={4}>
            <Text>• Try a behind-the-scenes video of your latest event to boost engagement.</Text>
            <Text>• Use hashtags <strong>#TumbunaHub</strong> <strong>#PNGContent</strong> to reach a wider audience.</Text>
          </VStack>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default Dashboard;
