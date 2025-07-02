import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  VStack,
  Button,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [postIdea, setPostIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function generatePostIdea() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", { method: "POST" });
      const data = await response.json();

      if (response.ok) {
        setPostIdea(data.suggestion);
      } else {
        setError(data.error || "Unknown error");
      }
    } catch {
      setError("Failed to fetch AI suggestion. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ChakraProvider>
      <Box p={6} maxW="600px" mx="auto">
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="xl" textAlign="center">
            Tumbuna Hub Dashboard
          </Heading>

          <Box textAlign="right">
            <IconButton
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              aria-label="Toggle color mode"
            />
          </Box>

          <Box>
            <Text fontSize="lg">Followers: 4,580</Text>
            <Text fontSize="lg">Engagement Rate: 15%</Text>
            <Text fontSize="lg">Reach: 18,300</Text>
          </Box>

          <Box>
            <Button
              onClick={generatePostIdea}
              isLoading={loading}
              colorScheme="teal"
              width="full"
            >
              Click to get AI-generated post idea
            </Button>

            {postIdea && (
              <Box mt={4} p={4} bg="gray.100" borderRadius="md">
                <Text>{postIdea}</Text>
              </Box>
            )}

            {error && (
              <Box mt={4} p={4} bg="red.100" borderRadius="md" color="red.700">
                <Text>{error}</Text>
              </Box>
            )}
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
