"use client";

import { Box, Container, SimpleGrid, Stack, Heading } from "@chakra-ui/react";
import { StatCard } from "./StatCard";
import { LuTruck, LuStar, LuSmilePlus, LuStore } from "react-icons/lu";
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function StatsSection() {
    const t = useTranslations('stats');
    const sectionRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const badge = badgeRef.current;
        const heading = headingRef.current;
        const line = lineRef.current;
        const cards = cardsRef.current;

        if (!section || !badge || !heading || !cards) return;

        gsap.set(badge, { y: -30, opacity: 0, scale: 0.8 });
        gsap.set(heading, { y: 30, opacity: 0 });
        gsap.set(line, { scaleX: 0, opacity: 0 });
        gsap.set(cards.children, { y: 50, opacity: 0, scale: 0.9 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
            }
        });

    
        tl.to(badge, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)"
        })

        .to(heading, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.3")
   
        .to(line, {
            scaleX: 1,
            opacity: 1,
            duration: 1,
            ease: "power2.inOut"
        }, "-=0.4")

        .to(cards.children, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.4)"
        }, "-=0.6");

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            tl.kill();
        };
    }, []);

    return (
        <Box ref={sectionRef} py={24} bg="white">
            <Container maxW="container.xl">
                <Stack gap={4} align="center" textAlign="center" mb={20}>
                    <Box
                        ref={badgeRef}
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

                    <Heading
                        ref={headingRef}
                        color="gray.900"
                        fontSize={{ base: "3xl", md: "5xl" }}
                        maxW="2xl"
                        fontWeight="medium"
                        lineHeight={{ base: "1.2", md: "1.25" }}
                    >
                        {t('title')}
                    </Heading>
                </Stack>

                <Box position="relative" pt={10}>
                    <Box
                        ref={lineRef}
                        display={{ base: "none", md: "block" }}
                        position="absolute"
                        top="40px"
                        left="12%"
                        right="12%"
                        h="1px"
                        bg="gray.200"
                        zIndex={0}
                        transformOrigin="left"
                    />

                    <SimpleGrid color={"gray"} ref={cardsRef} columns={{ base: 1, md: 4 }} gap={10}>
                        <StatCard icon={LuTruck} number="32k" label={t('deliveries')}/>
                        <StatCard icon={LuStar} number="2.8k" label={t('reviews')}/>
                        <StatCard icon={LuSmilePlus} number="1245" label={t('happyClients')} />
                        <StatCard icon={LuStore} number="5875" label={t('totalStore')}/>
                    </SimpleGrid>
                </Box>
            </Container>
        </Box>
    );
}
