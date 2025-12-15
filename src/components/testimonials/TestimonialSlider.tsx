'use client';

import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react';
import { MarqueeRow } from './MarqueeRow';
import { useTranslations } from 'next-intl';

const TestimonialSlider = () => {
    const t = useTranslations('testimonials');
    const testimonials = t.raw('reviews') as Array<{
        id: number;
        name: string;
        role: string;
        content: string;
    }>;

    return (
        <Box py={20} bg="white" overflow="hidden">
            <Container maxW="container.xl" mb={16} textAlign="center">
                <Text
                    color="#5CBB00"
                    fontWeight="bold"
                    textTransform="uppercase"
                    fontSize="sm"
                    letterSpacing="wide"
                    mb={4}
                >
                    {t('badge')}
                </Text>

                <Heading
                    as="h2"
                    fontSize={{ base: '3xl', md: '5xl' }}
                    fontWeight="medium"
                    color="gray.900"
                    mb={6}
                    lineHeight={{ base: "1.2", md: "1.25" }}
                >
                    {t('title')}
                </Heading>

                <Text fontSize="lg" color="gray.500" maxW="2xl" mx="auto">
                    {t('subtitle')}
                </Text>
            </Container>

            <Stack gap={8}>
                <MarqueeRow reviews={testimonials} direction="left" speed={50} />
                <MarqueeRow
                    reviews={[...testimonials].reverse()}
                    direction="right"
                    speed={60}
                />
            </Stack>
        </Box>
    );
};

export default TestimonialSlider;