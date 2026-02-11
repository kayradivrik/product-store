import {
  Container,
  Text,
  VStack,
  SimpleGrid,
  Box,
  Button,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import { FiPackage } from "react-icons/fi";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const emptyBg = useColorModeValue("gray.50", "gray.800");
  const emptyBorder = useColorModeValue("gray.200", "gray.700");

  return (
    <Container maxW="7xl" py={14}>
      <VStack spacing={12}>
        <VStack spacing={3}>
          <Text
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="extrabold"
            letterSpacing="-1px"
          >
            Product Dashboard
          </Text>

          <Text
            fontSize="md"
            color={useColorModeValue("gray.500", "gray.400")}
            textAlign="center"
          >
            Manage and organize your products in one place.
          </Text>
        </VStack>

        {products.length > 0 ? (
          <SimpleGrid
            columns={{ base: 1, sm: 2, lg: 3 }}
            spacing={8}
            w="full"
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        ) : (
          <Box
            w="full"
            bg={emptyBg}
            border="1px solid"
            borderColor={emptyBorder}
            rounded="2xl"
            p={14}
            textAlign="center"
            transition="all 0.3s ease"
          >
            <VStack spacing={6}>
              <Icon as={FiPackage} boxSize={12} opacity={0.6} />

              <Text fontSize="xl" fontWeight="semibold">
                No products yet
              </Text>

              <Text
                fontSize="sm"
                color={useColorModeValue("gray.500", "gray.400")}
              >
                Start by creating your first product.
              </Text>

              <Link to="/create">
                <Button
                  colorScheme="purple"
                  rounded="full"
                  px={8}
                  size="md"
                >
                  Create Product
                </Button>
              </Link>
            </VStack>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
