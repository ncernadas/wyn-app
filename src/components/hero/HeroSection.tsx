"use client";

import { Box, Container, Flex, Heading, Button, Text } from "@chakra-ui/react";
import { VideoCard } from "./VideoCard";
import HeroPackage3D from "./HeroPackage3D";
import { useTranslations } from 'next-intl';

export function HeroSection() {
    const t = useTranslations('hero');

    return (
        <Box
            position="relative"
            h={{ base: "80vh", md: "90vh" }}
            minH="600px"
            borderBottomRadius={{ base: "40px", md: "60px" }}
            overflow="hidden"
            bg="gray.900"
        >
            <Box
                position="absolute"
                inset={0}
                bgGradient="linear(to-r, gray.800, orange.900)"
                _after={{
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    bg: "blackAlpha.400",
                }}
            >
                <Text
                    position="absolute"
                    right="10%"
                    top="20%"
                    fontSize="20vw"
                    fontWeight="bold"
                    color="whiteAlpha.100"
                    lineHeight="none"
                >
                    WYN
                </Text>
            </Box>

            <Container maxW="container.xl" h="full" position="relative" zIndex={5}>
                <Flex
                    h="full"
                    direction={{ base: "column", md: "row" }}
                    align={{ base: "start", md: "end" }}
                    justify="space-between"
                    pb={{ base: 20, md: 32 }}
                    pt={{ base: 32, md: 0 }}
                >
                    <Box maxW="2xl">
                        <Heading
                            as="h1"
                            fontSize={{ base: "4xl", md: "7xl" }}
                            color="white"
                            lineHeight="1.1"
                            mb={8}
                            fontWeight="medium"
                        >
                            {t('headline')}
                        </Heading>

                        <Button
                            variant="outline"
                            color="white"
                            _hover={{ bg: "#5CBB00" }}
                            rounded="full"
                            size="lg"
                            px={8}
                            borderColor="whiteAlpha.800"
                        >
                            {t('learnMore')}
                        </Button>
                    </Box>
                    <Box
                        flex="1"
                        display="flex"
                        justifyContent={{ base: "center", md: "flex-end" }}
                        w="100%"
                        transform={{ base: "translateY(0)", md: "translateY(-20px)" }}
                    >
                        <HeroPackage3D />
                    </Box>

                    <VideoCard />
                </Flex>
            </Container>
        </Box>
    );
}
