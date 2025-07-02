import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Spinner,
  useToast,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import { SunIcon } from '@chakra-ui/icons';

function App() {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const toast = useToast();

  async function generateSuggestion() {
    setLoading(true);
    setSuggestion('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setSuggestion(data.suggestion);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch AI suggestion. Please try again.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
    setLoading(false);
  }

  return (
    <ChakraProvider>
      <Box maxW="600px" mx="auto" p={6} mt={10} borderWidth={1} borderRadius="md" boxShadow="md">
        <HStack mb={6} spacing={3}>
          <SunIcon boxSize={8} color="orange.400" />
          <Heading>Tumbuna Hub Dashboard</Heading>
        </HStack>

        <VStack spacing={5} mb={8}>
          <Stat>
            <StatLabel>Followers</StatLabel>
            <StatNumber>4,580</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Engagement Rate</StatLabel>
            <StatNumber>15%</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Reach</StatLabel>
            <StatNumber>18,300</StatNumber>
          </Stat>
        </VStack>

        <Box mb={4}>
          <Text fontWeight="bold" mb={2}>
            AI Post Suggestions
          </Text>
          {loading ? (
            <Spinner />
          ) : suggestion ? (
            <Text fontStyle="italic" p={3} bg="gray.100" borderRadius="md">
              {suggestion}
            </Text>
          ) : (
            <Text>Click the button to get a fresh AI-generated post idea.</Text>
          )}
        </Box>

        <Button colorScheme="orange" onClick={generateSuggestion} isLoading={loading}>
          Generate Post Idea
        </Button>
      </Box>
    </ChakraProvider>
  );
}

export default App;
