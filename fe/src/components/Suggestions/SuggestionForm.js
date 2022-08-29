import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    VStack,
    Textarea,
    HStack,
    useToast,
    Heading,
    Center,
    Spinner
} from "@chakra-ui/react";
import { 
    nameValidator,
    addressValidator,
    zipValidation,
    fileValidation
} from '../../utils/validators.js'
import React from 'react';
import { Formik, Field } from 'formik';

import { useInsertSuggestionMutation } from "../../api/apiSlice.js";

export function SuggestionForm() {
    const [selectedFile, setSelectedFile] = React.useState(null)
    const fileError = fileValidation(selectedFile)
    const toast = useToast()
    const [insertSuggestion, { isLoading }] = useInsertSuggestionMutation()

    async function onSubmit(values, { resetForm }){
        if(fileError) return;
        const formData = new FormData()
        for(const field in values){
            formData.append(field, values[field])
        }
        formData.append("image", selectedFile)

        try {
            await insertSuggestion(formData)
            resetForm()
            setSelectedFile(null)
            toast({
                title: "Suggestion created",
                description: "Suggestion was succesfully uploaded to our server.",
                status: 'success',
                duration: 2000,
                isClosable: true
            })
        }            
        catch(err){
            toast({
                title: "Suggestion not created",
                description: err.response.data,
                status: 'error',
                duration: 2000,
                isClosable: true
            })
        }
    }

    return (
        <Flex bg="gray.200" align="center" justify="center" grow="1">
            <Box bg="white" p={5} rounded="md" w="25em">
                <Center pb={10} size="lg" as={Heading}>Create suggestion</Center>
                <Formik
                    initialValues={{
                        name: "",
                        surname: "",
                        address: "",
                        zipcode: "",
                        description: "",
                    }}
                    onSubmit={onSubmit}
                >
                {({ handleSubmit, errors, touched }) => (
                    <form onSubmit={handleSubmit}>
                        <VStack spacing={4} align="flex-start">
                            <HStack align="top">
                                <FormControl isInvalid={!!errors.name && touched.name} w="50%">
                                    <FormLabel htmlFor="name">Name</FormLabel>
                                    <Field
                                        as={Input}
                                        id="name"
                                        name="name"
                                        type="name"
                                        variant="filled"
                                        required={true}
                                        validate={nameValidator}
                                    />
                                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={!!errors.surname && touched.surname} w="50%">
                                    <FormLabel htmlFor="surame">Surname</FormLabel>
                                    <Field
                                        as={Input}
                                        id="surname"
                                        name="surname"
                                        type="surame"
                                        variant="filled"
                                        required={true}
                                        validate={nameValidator}
                                    />
                                    <FormErrorMessage>{errors.surname}</FormErrorMessage>
                                </FormControl>
                            </HStack>
                            <HStack align={"top"}>
                                <FormControl isInvalid={!!errors.address && touched.address}>
                                    <FormLabel htmlFor="surame">Address line</FormLabel>
                                    <Field
                                        as={Input}
                                        id="address"
                                        name="address"
                                        type="address"
                                        variant="filled"
                                        required={true}
                                        validate={addressValidator}
                                    />
                                    <FormErrorMessage>{errors.address}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={!!errors.zipcode && touched.zipcode}>
                                    <FormLabel htmlFor="surame">Zipcode</FormLabel>
                                    <Field
                                        as={Input}
                                        id="zipcode"
                                        name="zipcode"
                                        type="text"
                                        pattern="[0-9]*"
                                        variant="filled"
                                        required={true}
                                        validate={zipValidation}
                                    />
                                    <FormErrorMessage>{errors.zipcode}</FormErrorMessage>
                                </FormControl>
                            </HStack>

                            <FormControl isInvalid={!!errors.description && touched.description}>
                                <FormLabel htmlFor="surame">Description</FormLabel>
                                <Field
                                    as={Textarea}
                                    id="description"
                                    name="description"
                                    type="description"
                                    variant="filled"
                                    required={true}
                                    resize={false}
                                />
                                <FormErrorMessage>{errors.description}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={fileError}>
                                <Input
                                    type="file"
                                    name="file"
                                    id="file"
                                    key={touched.name}
                                    required={true}
                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                    accept=".jpg,.jpeg,.png,.gif"
                                />
                                <FormErrorMessage>{fileError}</FormErrorMessage>
                            </FormControl>
                            { isLoading ? 
                            <Flex w="100%" justify="center">
                                <Spinner 
                                    color="blue.300"
                                    speed="0.65s"
                                    thickness="4px"
                                    size="lg"
                                />
                            </Flex> :
                            <Button type="submit" colorScheme="blue" width="full">
                                Post
                            </Button>}
                        </VStack>
                    </form>
                )}
                </Formik>
            </Box>
        </Flex>
    );
}