'use client'

import {
    Box,
    Flex,
    Heading,
    Text,
    SimpleGrid,
    Icon,
    HStack,
    VStack,
    Avatar,
    AvatarGroup,
    IconButton,
    Tag,
    Image as ChakraImage
} from '@chakra-ui/react';
import { LuArrowDown, LuTruck, LuRocket, LuPackageCheck } from 'react-icons/lu';
import { FaStar } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { getImagePath } from '@/imagesPath';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const colors = {
    darkGreen: '#5CBB00',
    lightGreenBox: '#272726',
    coralBg: '#272726',
    tagDark: '#5CBB00',
};

const CustomTag = ({ icon: IconComponent, label }: { icon: any; label: string }) => (
    <Tag.Root
        size="lg"
        borderRadius="full"
        bg={colors.tagDark}
        color="white"
        py={3}
        px={6}
        variant="solid"
    >
        <Tag.StartElement>
            <IconComponent size={20} />
        </Tag.StartElement>
        <Tag.Label fontWeight="bold" fontSize="sm">
            {label}
        </Tag.Label>
    </Tag.Root>
);

const LogisticServices = () => {
    const t = useTranslations('services');
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const ratingRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const tagsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const heading = headingRef.current;
        const text = textRef.current;
        const button = buttonRef.current;
        const rating = ratingRef.current;
        const image = imageRef.current;
        const tags = tagsRef.current;

        if (!section || !heading || !text) return;

        gsap.set(heading, { x: -100, opacity: 0 });
        gsap.set(text, { x: -100, opacity: 0 });
        gsap.set(button, { scale: 0, opacity: 0 });
        gsap.set(rating, { x: -50, opacity: 0 });
        gsap.set(image, { scale: 0.8, opacity: 0, rotation: -10 });
        if (tags) gsap.set(tags.children, { y: 50, opacity: 0, scale: 0.8 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
            }
        });

        tl.to(heading, {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        })
        .to(text, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.6")
        .to(button, {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)"
        }, "-=0.4")
        .to(rating, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.5")

        .to(image, {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1,
            ease: "back.out(1.4)"
        }, "-=0.8")

        .to(tags?.children || [], {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.4)"
        }, "-=0.6");

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            tl.kill();
        };
    }, []);

    return (
        <Box ref={sectionRef} as="section" py={16} px={{ base: 4, md: 8 }}>
            <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                bg={colors.darkGreen}
                rounded="3xl"
                overflow="hidden"
                minH={{ lg: "600px" }}
            >

                <Flex
                    direction="column"
                    justify="center"
                    p={{ base: 8, md: 16, xl: 20 }}
                    color="white"
                >
                    <Heading
                        ref={headingRef}
                        as="h2"
                        fontSize={{ base: "3xl", md: "4xl", xl: "5xl" }}
                        fontWeight="extrabold"
                        lineHeight="1.2"
                        mb={6}
                    >
                        {t('title')}
                    </Heading>

                    <Text ref={textRef} fontSize="lg" opacity={0.9} mb={12} maxW="lg">
                        {t('description')}
                    </Text>

                    <Flex
                        direction={{ base: 'column', sm: 'row' }}
                        align={{ base: 'start', sm: 'center' }}
                        gap={8}
                    >

                        <IconButton
                            ref={buttonRef}
                            aria-label="Scroll down"
                            variant="outline"
                            color="white"
                            borderColor="whiteAlpha.500"
                            rounded="full"
                            size="lg"
                            h="80px"
                            w="80px"
                            _hover={{ bg: 'whiteAlpha.200' }}
                        >
                            <LuArrowDown size={32} />
                        </IconButton>

                        <HStack
                            ref={ratingRef}
                            bg={colors.lightGreenBox}
                            p={4}
                            rounded="2xl"
                            gap={6}
                        >

                            <AvatarGroup size="md" gap="-8px" borderColor={colors.lightGreenBox}>
                                <Avatar.Root size={"lg"}>
                                    <Avatar.Fallback name="Segun Adebayo" />
                                    <Avatar.Image src="https://bit.ly/sage-adebayo" />
                                </Avatar.Root>
                            </AvatarGroup>


                            <VStack align="start" gap={1}>
                                <HStack gap={1} color="orange.400">
                                    {[...Array(4)].map((_, i) => (<Icon key={i} as={FaStar} />))}
                                    <Icon as={FaStar} style={{ clipPath: 'inset(0 30% 0 0)' }} />
                                    <Text fontWeight="bold" color="white" ml={1}>4.7/5</Text>
                                </HStack>
                                <Text fontSize="sm" fontWeight="medium">{t('rating.basedOn')}</Text>
                            </VStack>
                        </HStack>
                    </Flex>
                </Flex>

                <Flex
                    bg={colors.coralBg}
                    direction="column"
                    justify="space-between"
                    align="center"
                    p={{ base: 8, md: 16 }}
                    position="relative"
                >

                    <Box
                        ref={imageRef}
                        w="full"
                        h={{ base: "300px", lg: "400px" }}
                        bg="blackAlpha.100"
                        rounded="xl"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        mb={10}
                    >

                        <ChakraImage
                            src={getImagePath('/undraw5.svg')}
                            alt="Warehouse logistics illustration"
                            objectFit="contain"
                            maxH="450px"
                        />

                    </Box>

                    <Flex
                        ref={tagsRef}
                        wrap="wrap"
                        justify="center"
                        gap={4}
                        w="full"
                    >
                        <CustomTag icon={LuTruck} label={t('tags.delivery')} />
                        <CustomTag icon={LuRocket} label={t('tags.innovations')} />
                        <CustomTag icon={LuPackageCheck} label={t('tags.logisticsSolutions')} />
                    </Flex>
                </Flex>
            </SimpleGrid>
        </Box>
    );
};

export default LogisticServices;