import { Box, Container, useColorModeValue } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  const bgGradient = useColorModeValue(
    "linear(to-br, gray.50, gray.100)",
    "linear(to-br, gray.900, gray.800)"
  );

  return (
    <Box
      minH="100vh"
      bgGradient={bgGradient}
      transition="background 0.3s ease"
    >
      <Navbar />

      <Container maxW="7xl" py={10}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
