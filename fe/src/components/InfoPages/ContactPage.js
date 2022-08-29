import React from "react";
import {
    HStack,
    Heading,
    Image,
    Tag,
    Link,
    VStack
} from '@chakra-ui/react'
export function ContactPage(){
    return (
    <VStack bg="gray.200"direction="column" align="center" grow={1} height="100vh">
    <Heading mt={2} color="teal">Github</Heading>
    <HStack>
        <Link
            href="https://github.com/overjoyedbrass"
        >
            <Tag fontSize="1.5em">OverjoyedBrass</Tag>
        </Link>
        <Image
            src="https://avatars.githubusercontent.com/u/79214190"
            boxSize="40px"
            rounded="full"
            m={10}
        />
    </HStack>
    </VStack>
    )
}