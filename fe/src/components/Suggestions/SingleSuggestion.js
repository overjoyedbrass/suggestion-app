import React from "react";
import {
    Flex, 
    Box, 
    Image,
    Heading,
    Tag,
    HStack,
    VStack,
    Text,
    Modal,
    useDisclosure,
    ModalContent,
    ModalOverlay,
    ModalCloseButton,
    Skeleton,
} from '@chakra-ui/react'
import { useParams } from "react-router-dom";
import { useGetSuggestionByIdQuery } from "../../api/apiSlice";
import { BASE_URL } from "../../config";
import { format, parseISO } from "date-fns";
import { ErrorPage } from '../InfoPages/ErrorPage.js'

function isObjectEmpty(object){
    for(const _property in object){
        return false
    }
    return true
}

export function SingleSuggestion(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { id } = useParams()
    const {
        data={},
        isLoading,
        isFetching
    } = useGetSuggestionByIdQuery(id)

    if(isObjectEmpty(data)){
        return (
            <ErrorPage />
        )
    }
    const suggestion = {
        ...data,
        date: parseISO(data.date)
    }

    return (
        <Flex 
            bg="gray.200" 
            grow={1}
            shrink={1}
            overflow="auto"
            direction="column" 
            align="center"
            overflowX="auto"
        >
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent
                    maxW="60%"
                >
                    <ModalCloseButton bg="blue.100"/>
                    <Image
                        alt={'full image'}
                        cursor="pointer"
                        onClick={onClose}
                        src={
                            `${BASE_URL}/${suggestion.filename}`
                        }
                        objectFit={'cover'}
                    />
                </ModalContent>
            </Modal>
            <Skeleton isLoaded={!isLoading && !isFetching}>
            <VStack 
                spacing={5} 
                bg="white" 
                p={4}
                m={4}
                rounded="lg" 
                minW="20em" 
                align="flex-start" 
                maxW="25em"
            >
                <HStack justify="center" w="100%">
                    <Heading size="md">Suggestion</Heading>
                    <Tag bg="blue.100" fontSize="lg">{format(suggestion.date, "dd.MM.yyyy")}</Tag>
                </HStack>
                <HStack>
                    <Tag>Fullname:</Tag>
                    <Text>{suggestion.name} {suggestion.surname}</Text>
                </HStack>
                <HStack>
                    <Tag>Address:</Tag>
                    <Text>{suggestion.address}</Text>
                </HStack>
                <Box align="center">
                    <Flex align="flex-start">
                        <Tag align="center" sx={{width: "fit-content"}}>Description:</Tag>
                    </Flex>
                    <Text textAlign="justify">
                        {suggestion.description}
                    </Text>
                </Box>
                <Box w="100%" align="center">
                <Image
                    
                    width="10em"
                    rounded={"2em"}
                    alt={'preview image'}
                    boxSize="200px"
                    cursor="pointer"
                    onClick={onOpen}
                    src={
                        `${BASE_URL}/${suggestion.filename}`
                    }
                    objectFit={'cover'}
                    _hover={{
                        outline: "3px solid",
                        outlineColor: "blue.200"
                    }}
                />
                </Box>
            </VStack>
            </Skeleton>
        </Flex>
    )
}