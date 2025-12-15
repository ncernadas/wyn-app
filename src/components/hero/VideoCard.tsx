"use client";

import { Flex, Box, Circle, Text, Icon } from "@chakra-ui/react";
import { LuPlay } from "react-icons/lu";
import { useTranslations } from 'next-intl';

export function VideoCard() {
    const t = useTranslations('hero.videoCard');

    return (
        <Flex
            bg="whiteAlpha.200"
            backdropFilter="blur(16px)"
            border="1px solid"
            borderColor="whiteAlpha.300"
            p={5}
            rounded="2xl"
            w="full"
            maxW="sm"
            align="center"
            gap={6}
        >
            <Box flex={1}>
                <Text color="whiteAlpha.700" fontSize="sm" mb={1}>
                    {t('counter')}
                </Text>

                <Text color="white" fontSize="xl" fontWeight="medium" lineHeight="short">
                    {t('title')}
                </Text>
            </Box>

            <Box
                position="relative"
                w="100px"
                h="64px"
                rounded="lg"
                overflow="hidden"
                bg="gray.800"
                flexShrink={0}
            >
                <Box position="absolute" inset={0} bg="#5CBB00" opacity={0.6} />
                <Flex position="absolute" inset={0} align="center" justify="center">
                    <Circle size="32px" bg="white" color="#5CBB00">
                        <Icon as={LuPlay} ml={0.5} />
                    </Circle>
                </Flex>
            </Box>
        </Flex>
    );
}
