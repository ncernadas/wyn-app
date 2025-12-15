'use client'

import {
    Box,
    Container,
    Flex,
    Heading,
    Text,
    SimpleGrid,
    Button,
    Accordion,
    Stack
} from '@chakra-ui/react';
import { LuChevronDown, LuArrowRight } from 'react-icons/lu';
import { useTranslations } from 'next-intl';

const LogisticsFaqSection = () => {
    const t = useTranslations('faq');
    const questions = t.raw('questions') as Array<{ question: string; answer: string }>;

    return (
        <Box as="section" py={20} bg="white">
            <Container maxW="container.xl">

                <SimpleGrid columns={{ base: 1, lg: 2 }} gap={10} mb={16} alignItems="end">
                    <Box>
                        <Heading
                            as="h2"
                            fontSize={{ base: "3xl", md: "5xl" }}
                            fontWeight="medium"
                            lineHeight="1.1"
                            color="gray.900"
                            mb={4}
                        >
                            {t('title')} <br />
                            <Text as="span" color="#5CBB00">{t('titleHighlight')}</Text>
                        </Heading>
                    </Box>
                    <Box>
                        <Text fontSize="lg" color="gray.500" maxW="md">
                            {t('subtitle')}
                        </Text>
                    </Box>
                </SimpleGrid>

                <Box mb={20}>
                    <Accordion.Root collapsible defaultValue={['item-1']} variant="plain">
                        {questions.map((item, index) => (
                            <Accordion.Item
                                key={`item-${index + 1}`}
                                value={`item-${index + 1}`}
                                bg="gray.50"
                                borderRadius="xl"
                                mb={4}
                                _hover={{ bg: 'gray.100' }}
                                transition="background 0.2s"
                            >
                                <Accordion.ItemTrigger
                                    py={6}
                                    px={8}
                                    cursor="pointer"
                                    _expanded={{ fontWeight: 'bold', color: '#5CBB00' }}
                                >
                                    <Flex justify="space-between" align="center" w="full">
                                        <Box as="span" flex="1" textAlign="left" fontSize="lg" fontWeight="medium" color={"gray"}>
                                            {item.question}
                                        </Box>
                                        <Accordion.ItemIndicator>
                                            <LuChevronDown />
                                        </Accordion.ItemIndicator>
                                    </Flex>
                                </Accordion.ItemTrigger>

                                <Accordion.ItemContent px={8} pb={6} pt={0}>
                                    <Text color="gray.600" lineHeight="tall">
                                        {item.answer}
                                    </Text>
                                </Accordion.ItemContent>
                            </Accordion.Item>
                        ))}
                    </Accordion.Root>
                </Box>

                <Box
                    bg="black"
                    borderRadius="3xl"
                    px={{ base: 6, md: 12 }}
                    py={{ base: 10, md: 16 }}
                    color="white"
                    position="relative"
                    overflow="hidden"
                >
                    <Flex
                        direction={{ base: 'column', md: 'row' }}
                        align={{ base: 'start', md: 'center' }}
                        justify="space-between"
                        gap={8}
                    >
                        <Box maxW="2xl">
                            <Heading as="h3" fontSize={{ base: "2xl", md: "3xl" }} mb={4} fontWeight="medium" lineHeight={{ base: "1.2", md: "1.25" }}>
                                {t('cta.headline')}
                            </Heading>
                            <Text color="gray.400">
                                {t('cta.subtitle')}
                            </Text>
                        </Box>

                        <Stack direction={{ base: 'column', sm: 'row' }} gap={4}>
                            <Button
                                variant="outline"
                                size="lg"
                                color="white"
                                borderColor="whiteAlpha.400"
                                _hover={{ bg: 'whiteAlpha.200' }}
                                rounded="full"
                                px={8}
                            >
                                {t('cta.seeService')}
                            </Button>
                            <Button
                                size="lg"
                                bg="white"
                                color="black"
                                _hover={{ bg: 'gray.200' }}
                                rounded="full"
                                px={8}
                            >
                                {t('cta.getQuote')} <LuArrowRight />
                            </Button>
                        </Stack>
                    </Flex>
                </Box>

            </Container>
        </Box>
    );
};

export default LogisticsFaqSection;