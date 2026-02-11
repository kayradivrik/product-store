import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  useColorModeValue,
  VStack,
  Button,
  Input,
  FormControl,
  FormLabel,
  Text,
  Divider,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { FiDollarSign, FiImage, FiTag } from "react-icons/fi";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);

    toast({
      title: success ? "Product Created" : "Something went wrong",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });

    if (success) {
      setNewProduct({
        name: "",
        price: "",
        image: "",
      });
    }
  };

  const cardBg = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const subtleText = useColorModeValue("gray.500", "gray.400");

  return (
    <Container maxW="lg" py={16}>
      <VStack spacing={10}>
        {/* 🔥 Header */}
        <VStack spacing={3}>
          <Heading size="xl" letterSpacing="-0.5px">
            Add New Product
          </Heading>
          <Text fontSize="sm" color={subtleText} textAlign="center">
            Fill in the details below to create a new product entry.
          </Text>
        </VStack>

        {/* 🔥 Form Card */}
        <Box
          w="full"
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          rounded="2xl"
          p={8}
          shadow="lg"
          transition="all 0.3s ease"
        >
          <VStack spacing={6}>
            <FormControl>
              <FormLabel fontSize="sm" fontWeight="medium">
                Product Name
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiTag />
                </InputLeftElement>
                <Input
                  placeholder="Enter product name"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  rounded="lg"
                  focusBorderColor="purple.400"
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" fontWeight="medium">
                Price
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiDollarSign />
                </InputLeftElement>
                <Input
                  type="number"
                  placeholder="Enter price"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  rounded="lg"
                  focusBorderColor="purple.400"
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" fontWeight="medium">
                Image URL
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiImage />
                </InputLeftElement>
                <Input
                  placeholder="Paste image URL"
                  value={newProduct.image}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.value })
                  }
                  rounded="lg"
                  focusBorderColor="purple.400"
                />
              </InputGroup>
            </FormControl>

            <Divider />

            <Button
              colorScheme="purple"
              size="lg"
              w="full"
              rounded="full"
              onClick={handleAddProduct}
              _hover={{
                transform: "translateY(-2px)",
                shadow: "lg",
              }}
              transition="all 0.2s ease"
            >
              Create Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
