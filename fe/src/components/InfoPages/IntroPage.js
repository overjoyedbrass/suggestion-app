import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

export function IntroPage(){
    return (
        <Flex bg="gray.200"direction="column" align="center" grow={1}>
            <Heading mt={2} color="teal">Intro Page</Heading>
            <Image 
                src="https://avatars.githubusercontent.com/u/79214190"
                maxWidth="20em"
                maxHeight="20em"
                rounded="full"
                m={10}
            />
            <Text fontSize="1.5em" m={4} bg="white" padding={5} rounded="3xl">
                Welcome in this simple app. Move around using navigation bar on the top.
            </Text>
        </Flex>
    )
}