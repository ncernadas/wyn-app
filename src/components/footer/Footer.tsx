'use client'

import {
    Box,
    Container,
    SimpleGrid,
    Stack,
    Text,
    Link,
    Flex,
    Button,
    IconButton,
    HStack
} from '@chakra-ui/react';
import { LuArrowRight, LuTwitter, LuInstagram, LuLinkedin } from 'react-icons/lu';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { getImagePath } from '@/imagesPath';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const t = useTranslations('footer');
    const footerRef = useRef<HTMLDivElement>(null);
    const linksGridRef = useRef<HTMLDivElement>(null);
    const logoSectionRef = useRef<HTMLDivElement>(null);
    const ctaSectionRef = useRef<HTMLDivElement>(null);
    const bottomSectionRef = useRef<HTMLDivElement>(null);

    const footerLinks = {
        company: {
            title: t('company.title'),
            links: [
                { label: t('company.aboutUs'), href: '#' },
                { label: t('company.ourTeam'), href: '#' },
                { label: t('company.sustainability'), href: '#' },
                { label: t('company.careers'), href: '#' },
            ]
        },
        services: {
            title: t('services.title'),
            links: [
                { label: t('services.worldwideShipping'), href: '#' },
                { label: t('services.seaFreight'), href: '#' },
                { label: t('services.airFreight'), href: '#' },
                { label: t('services.lastMileDelivery'), href: '#' },
            ]
        },
        shipping: {
            title: t('shipping.title'),
            links: [
                { label: t('shipping.trackPackages'), href: '#' },
                { label: t('shipping.calculateRate'), href: '#' },
                { label: t('shipping.schedulePickup'), href: '#' },
                { label: t('shipping.prohibitedItems'), href: '#' },
            ]
        },
        support: {
            title: t('support.title'),
            links: [
                { label: t('support.helpCenter'), href: '#' },
                { label: t('support.customsClearance'), href: '#' },
                { label: t('support.fileAClaim'), href: '#' },
                { label: t('support.contactUs'), href: '#' },
            ]
        },
        news: {
            title: t('news.title'),
            links: [
                { label: t('news.pressReleases'), href: '#' },
                { label: t('news.logisticsBlog'), href: '#' },
                { label: t('news.marketUpdates'), href: '#' },
            ]
        }
    };

    useEffect(() => {
        const footer = footerRef.current;
        const linksGrid = linksGridRef.current;
        const logoSection = logoSectionRef.current;
        const ctaSection = ctaSectionRef.current;
        const bottomSection = bottomSectionRef.current;

        if (!footer || !linksGrid || !logoSection || !ctaSection || !bottomSection) return;

        gsap.set(linksGrid.children, { y: 50, opacity: 0 });
        gsap.set(logoSection, { x: -50, opacity: 0 });
        gsap.set(ctaSection, { x: 50, opacity: 0 });
        gsap.set(bottomSection, { y: 30, opacity: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: footer,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play reverse play reverse",
            }
        });

        tl.to(linksGrid.children, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        })
        .to(logoSection, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.6")
        .to(ctaSection, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.6")
        .to(bottomSection, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.4");

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            tl.kill();
        };
    }, []);

    return (
        <Box ref={footerRef} as="footer" bg="white" pt={16} pb={8} borderTop="1px solid" borderColor="gray.100">
            <Container maxW="container.xl">

                <SimpleGrid ref={linksGridRef} columns={{ base: 2, md: 3, lg: 5 }} gap={8} mb={16}>
                    {Object.entries(footerLinks).map(([category, data]) => (
                        <Stack key={category} align="flex-start" gap={3}>
                            <Text fontWeight="bold" fontSize="lg" color="gray.900" mb={1}>
                                {data.title}
                            </Text>
                            {data.links.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    color="gray.500"
                                    _hover={{ color: '#5CBB00', textDecoration: 'none' }}
                                    fontSize="sm"
                                    transition="color 0.2s"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </Stack>
                    ))}
                </SimpleGrid>

                <Box borderTopWidth="1px" borderColor="gray.200" mb={10} />

                <Flex
                    direction={{ base: 'column', md: 'row' }}
                    justify="space-between"
                    align={{ base: 'start', md: 'center' }}
                    gap={8}
                    mb={14}
                >

                    <Box ref={logoSectionRef}>
                        <Image
                            src={getImagePath("/logos/svg/LogoBlack.svg")}
                            alt="WYN Logo"
                            width={100}
                            height={40}
                            style={{ objectFit: "contain" }}
                        />
                        <Text color="gray.500" fontSize="sm" mt={4}>
                            {t('copyright')}
                        </Text>
                    </Box>

                    <Flex ref={ctaSectionRef} align="center" gap={4} wrap="wrap">
                        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="gray.800">
                            {t('readyToShip')}
                        </Text>
                        <Button
                            size="lg"
                            bg="#5CBB00"
                            color="white"
                            _hover={{ bg: "#68D000" }}
                            rounded="full"
                            px={8}
                        >
                            {t('support.contactUs')} <LuArrowRight />
                        </Button>
                    </Flex>
                </Flex>

                <Flex
                    ref={bottomSectionRef}
                    direction={{ base: 'column-reverse', md: 'row' }}
                    justify="space-between"
                    align="center"
                    gap={6}
                    pt={4}
                >
                    <HStack gap={6} color="gray.500" fontSize="sm">
                        <Link href="#" _hover={{ color: 'gray.900' }}>{t('termsOfUse')}</Link>
                        <Link href="#" _hover={{ color: 'gray.900' }}>{t('privacyPolicy')}</Link>
                    </HStack>

                    <Text color="gray.600" fontSize="sm" fontWeight="medium">
                        {t('email')}
                    </Text>

                    <HStack gap={3}>
                        <IconButton
                            aria-label="Twitter"
                            variant="outline"
                            color="gray.600"
                            borderColor="gray.300"
                            _hover={{ bg: 'gray.100', color: 'black' }}
                            size="md"
                            rounded="lg"
                        >
                            <LuTwitter />
                        </IconButton>
                        <IconButton
                            aria-label="Instagram"
                            variant="outline"
                            color="gray.600"
                            borderColor="gray.300"
                            _hover={{ bg: 'gray.100', color: 'black' }}
                            size="md"
                            rounded="lg"
                        >
                            <LuInstagram />
                        </IconButton>
                        <IconButton
                            aria-label="LinkedIn"
                            variant="outline"
                            color="gray.600"
                            borderColor="gray.300"
                            _hover={{ bg: 'gray.100', color: 'black' }}
                            size="md"
                            rounded="lg"
                        >
                            <LuLinkedin />
                        </IconButton>
                    </HStack>
                </Flex>

            </Container>
        </Box>
    );
};

export default Footer;