import React, { useState } from "react";
import { ChakraProvider, Button, Text, VStack, Box, Heading } from "@chakra-ui/react";
import { SunIcon } from "@chakra-ui/icons";

export default function App() {
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const getAISuggestion = async () => {
    setLoading(true);
    setSuggestion("");
    try {
      const response = await fetch("/api/generate", { method: "POST" });
      const data = await response.json();
      setSuggestion(data.suggestion || "AI i no givim tok.");
    } catch (error) {
      console.error("Fetch error:", error);
      setSuggestion("Failed to fetch AI suggestion. Please try again.");
    }
    setLoading(false);
  };

  return (
    <ChakraProvider>
      <Box p={6} maxW="600px" mx="auto" mt={10} borderWidth={1} borderRadius="md" boxShadow="lg">
        <VStack spacing={6}>
          <Heading>Tumbuna Hub - PNG Tok Pisin AI Post Ideas</Heading>
          <Button
            leftIcon={<SunIcon />}
            colorScheme="teal"
            onClick={getAISuggestion}
            isLoading={loading}
            loadingText="Generating..."
          >
            Get AI Post Idea
          </Button>
          <Text fontSize="lg" fontStyle="italic" minH="80px" px={4} textAlign="center">
            {suggestion || "Click the button to get a fresh AI-generated post idea in Tok Pisin."}
          </Text>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}
