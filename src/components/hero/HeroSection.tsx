"use client";

import { Box, Container, Flex, Heading, Button, Text } from "@chakra-ui/react";
import { VideoCard } from "./VideoCard";
import HeroPackage3D from "./HeroPackage3D";
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
    const t = useTranslations('hero');
    const headingRef = useRef<HTMLHeadingElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const wynTextRef = useRef<HTMLParagraphElement>(null);
    const package3DRef = useRef<HTMLDivElement>(null);
    const videoCardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const heading = headingRef.current;
        const button = buttonRef.current;
        const wynText = wynTextRef.current;
        const package3D = package3DRef.current;
        const videoCard = videoCardRef.current;

        if (!heading || !button) return;

        gsap.set(wynText, { scale: 0.5, opacity: 0 });
        gsap.set(heading, { y: 100, opacity: 0, clipPath: "inset(0 100% 0 0)" });
        gsap.set(button, { y: 50, opacity: 0, scale: 0.8 });

        if (package3D) gsap.set(package3D, { opacity: 0 });
        if (videoCard) gsap.set(videoCard, { y: 100, opacity: 0, scale: 0.9 });


        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heading,
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: "play reverse play reverse",
            },
            defaults: { ease: "power3.out" },
            delay: 0.3
        });

        if (wynText) {
            tl.to(wynText, {
                scale: 1,
                opacity: 1,
                duration: 1.2,
                ease: "back.out(1.7)"
            }, 0);
        }

        tl.to(heading, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out"
        }, 0.3)
            .to(heading, {
                clipPath: "inset(0 0% 0 0)",
                duration: 1.2,
                ease: "power4.out"
            }, 0.3);

        tl.to(button, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.5");

        if (package3D) {
            tl.to(package3D, {
                opacity: 1,
                duration: 1.2,
                ease: "power3.out"
            }, "-=0.8");
        }

        if (videoCard) {
            tl.to(videoCard, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.4)"
            }, "-=0.6");
        }

        const handleMouseEnter = () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        if (button) {
            button.addEventListener("mouseenter", handleMouseEnter);
            button.addEventListener("mouseleave", handleMouseLeave);
        }

        let parallaxTrigger: ScrollTrigger | null = null;
        if (wynText) {
            parallaxTrigger = ScrollTrigger.create({
                trigger: wynText,
                start: "top top",
                end: "bottom top",
                scrub: 1,
                animation: gsap.to(wynText, {
                    y: 200,
                    ease: "none"
                })
            });
        }

        return () => {
            if (button) {
                button.removeEventListener("mouseenter", handleMouseEnter);
                button.removeEventListener("mouseleave", handleMouseLeave);
            }
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            tl.kill();
        };
    }, []);

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
                    ref={wynTextRef}
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
                            ref={headingRef}
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
                            ref={buttonRef}
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
                        ref={package3DRef}
                        flex="1"
                        display="flex"
                        justifyContent={{ base: "center", md: "flex-end" }}
                        w="100%"
                        transform={{ base: "translateY(0)", md: "translateY(-20px)" }}
                    >
                        <HeroPackage3D />
                    </Box>

                    <div ref={videoCardRef}>
                        <VideoCard />
                    </div>
                </Flex>
            </Container>
        </Box>
    );
}
