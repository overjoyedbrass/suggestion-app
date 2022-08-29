import React from "react";
import {
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    VStack,
    Tag,
  } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";

export function SuggestionPreview({ suggestion }){
    const navigate = useNavigate()
    return (
        <SimpleGrid
            onClick={() => navigate(`/suggestions/${suggestion.id}`)}
            bg={"white"}
            m={3} p={3} 
            columns={2} 
            spacing={10}
            border="1px solid"
            borderColor="gray.300"
            borderRadius={10}
            cursor="pointer"
            _hover={{ borderColor: "blue.500"}}
            style={{textAlign: "center"}}
        >
            <VStack justify={"center"}>
                <Heading size={"md"}><Tag bg="blue.100">{suggestion.name} {suggestion.surname}</Tag></Heading>
                <Text>{suggestion.address}</Text>
            </VStack>
            <Flex justify="center">
                <Image
                    width="10em"
                    rounded={"2em"}
                    alt={'preview image'}
                    boxSize="100px"
                    src={
                        `${BASE_URL}/${suggestion.filename}`
                    }
                    objectFit={'cover'}
                />
            </Flex>
        </SimpleGrid>)
}