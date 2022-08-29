import React from "react";
import {
    Flex,
    Button,
    HStack,
    Skeleton,
    useBreakpointValue,
} from '@chakra-ui/react';
import {
    ArrowDownIcon,
    ArrowUpIcon,
} from '@chakra-ui/icons'
import { SuggestionPreview } from "./SuggestionPreview";
import { useGetSuggestionsQuery } from "../../api/apiSlice";
import { parseISO } from "date-fns";

export function AllSuggestions(){
    const {
        data=[],
        isLoading,
        isFetching,
        refetch
    } = useGetSuggestionsQuery()
    const [ascending, setAscending] = React.useState(false)

    const suggestions = data.map(sugg => ({...sugg, date: parseISO(sugg.date)}))
    suggestions.sort((a, b) => ascending ? a.date-b.date : b.date-a.date)
    const Icon = ascending ? ArrowUpIcon : ArrowDownIcon
    return (
        <Flex
            bg="gray.200" 
            justify="flex-start" 
            grow={1}
            shrink={1}
            overflow="auto"
            direction="column" 
            align="center"
            pt={2}
        >
            <HStack>
                <Button colorScheme="blue" onClick={() => setAscending(!ascending)}>Date &nbsp;<Icon /></Button>
                <Button colorScheme='teal' onClick={refetch}>Refetch</Button>
            </HStack>
            <Skeleton isLoaded={!isLoading && !isFetching}
                w={useBreakpointValue({ base: "80%", lg: "30%", md: "45%", sm: "60%"})} 
            >
                {suggestions.map(sugg => <SuggestionPreview key={sugg.name + sugg.address} suggestion={sugg}/>)}
            </Skeleton>
        </Flex>
    )
}