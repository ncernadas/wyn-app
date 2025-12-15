"use client";

import { Box, Container, SimpleGrid, Stack, Heading } from "@chakra-ui/react";
import { StatCard } from "./StatCard";
import { LuTruck, LuStar, LuSmilePlus, LuStore } from "react-icons/lu";
import { useTranslations } from 'next-intl';

export function StatsSection() {
    const t = useTranslations('stats');

    return (
        <Box py={24} bg="white">
            <Container maxW="container.xl">
                <Stack gap={4} align="center" textAlign="center" mb={20}>
                    <Box
                        bg="gray.100"
                        color="gray.600"
                        mb={4}
                        px={4}
                        py={1}
                        rounded="full"
                        fontSize="sm"
                        fontWeight="bold"
                        textTransform="uppercase"
                    >
                        {t('badge')}
                    </Box>

                    <Heading color="gray.900" fontSize={{ base: "3xl", md: "5xl" }} maxW="2xl" fontWeight="medium" lineHeight={{ base: "1.2", md: "1.25" }}>
                        {t('title')}
                    </Heading>
                </Stack>

                <Box position="relative" pt={10}>
                    <Box
                        display={{ base: "none", md: "block" }}
                        position="absolute"
                        top="40px"
                        left="12%"
                        right="12%"
                        h="1px"
                        bg="gray.200"
                        zIndex={0}
                    />

                    <SimpleGrid columns={{ base: 1, md: 4 }} gap={10}>
                        <StatCard icon={LuTruck} number="32k" label={t('deliveries')} />
                        <StatCard icon={LuStar} number="2.8k" label={t('reviews')} />
                        <StatCard icon={LuSmilePlus} number="1245" label={t('happyClients')} />
                        <StatCard icon={LuStore} number="5875" label={t('totalStore')} />
                    </SimpleGrid>
                </Box>
            </Container>
        </Box>
    );
}
