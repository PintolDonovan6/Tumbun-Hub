import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  useColorMode,
  useColorModeValue,
  IconButton,
  extendTheme,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

function Dashboard() {
  const [postSuggestion, setPostSuggestion] = useState(
    "Try a behind-the-scenes video of your latest event to boost engagement."
  );

  const generatePostSuggestion = () => {
    // Dummy AI logic: rotate between suggestions
    const suggestions = [
      "Try a behind-the-scenes video of your latest event to boost engagement.",
      "Use hashtags #TumbunaHub #PNGContent to reach a wider audience.",
      "Post a poll to engage your followers with questions about their favorite content.",
      "Share a customer testimonial video to build trust and credibility.",
    ];
    const currentIndex = suggestions.indexOf(postSuggestion);
    const nextIndex = (currentIndex + 1) % suggestions.length;
    setPostSuggestion(suggestions[nextIndex]);
  };

  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.50", "gray.900");
  const boxBg = useColorModeValue("gray.100", "gray.700");
  const headingColor = useColorModeValue("teal.600", "teal.300");
  const statColor = useColorModeValue("teal.700", "teal.400");

  return (
    <Box p={6} maxW="900px" mx="auto" bg={bg} minH="100vh">
      <HStack justify="space-between" mb={6}>
        <Heading color={headingColor}>Tumbuna Hub Dashboard</Heading>
        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
      </HStack>

      <HStack spacing={6} mb={8} justify="space-between" flexWrap="wrap">
        <Box
          bg={boxBg}
          p={4}
          borderRadius="md"
          flex="1"
          minW="150px"
          textAlign="center"
          mb={{ base: 4, md: 0 }}
        >
          <Text fontWeight="bold" fontSize="lg">
            Followers
          </Text>
          <Text fontSize="3xl" color={statColor}>
            4,560
          </Text>
        </Box>
        <Box
          bg={boxBg}
          p={4}
          borderRadius="md"
          flex="1"
          minW="150px"
          textAlign="center"
          mb={{ base: 4, md: 0 }}
        >
          <Text fontWeight="bold" fontSize="lg">
            Engagement Rate
          </Text>
          <Text fontSize="3xl" color={statColor}>
            12.5%
          </Text>
        </Box>
        <Box
          bg={boxBg}
          p={4}
          borderRadius="md"
          flex="1"
          minW="150px"
          textAlign="center"
        >
          <Text fontWeight="bold" fontSize="lg">
            Reach
          </Text>
          <Text fontSize="3xl" color={statColor}>
            18,300
          </Text>
        </Box>
      </HStack>

      <VStack align="start" spacing={4}>
        <Heading size="md" color={headingColor}>
          AI Post Suggestions
        </Heading>
        <Text fontStyle="italic">“{postSuggestion}”</Text>
        <Button
          colorScheme="teal"
          mt={2}
          onClick={generatePostSuggestion}
          aria-label="Generate a new post suggestion"
        >
          Generate Post Idea
        </Button>
      </VStack>
    </Box>
  );
}

function App() {
  // Optional: Customize Chakra theme here if you want
  const theme = extendTheme({
    config: {
      initialColorMode: "light",
      useSystemColorMode: false,
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Dashboard />
    </ChakraProvider>
  );
}

export default App;
