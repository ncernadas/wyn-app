"use client";

import { Flex, HStack, Button, Link } from "@chakra-ui/react";
import { LuArrowRight } from "react-icons/lu";
import { NavItem } from "./NavItem";
import { useTranslations } from 'next-intl';
import { LanguagePicker } from './LanguagePicker';
import Image from "next/image";
import { getImagePath } from "@/imagesPath";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Navbar() {
    const t = useTranslations('navbar');
    const navRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const nav = navRef.current;
        const logo = logoRef.current;
        const links = linksRef.current;
        const button = buttonRef.current;

        if (!nav || !logo || !links || !button) return;

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        gsap.set([logo, button], { y: -50, opacity: 0 });
        gsap.set(links.children, { y: -30, opacity: 0 });

        tl.to(logo, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2
        })
            .to(links.children, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1
            }, "-=0.4")
            .to(button, {
                y: 0,
                opacity: 1,
                duration: 0.8
            }, "-=0.6");

        ScrollTrigger.create({
            start: "100px top",
            end: "bottom bottom",
            onEnter: () => {
                setIsSticky(true);
                gsap.to(nav, {
                    y: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                    backdropFilter: "blur(20px)",
                    padding: "1rem 2rem",
                    duration: 0.3,
                    ease: "power2.out"
                });
            },
            onLeaveBack: () => {
                setIsSticky(false);
                gsap.to(nav, {
                    backgroundColor: "transparent",
                    backdropFilter: "blur(0px)",
                    padding: "2rem",
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            tl.kill();
        };
    }, []);

    return (
        <Flex
            ref={navRef}
            as="nav"
            position="fixed"
            top={0}
            w="full"
            zIndex={10}
            p={{ base: 4, md: 8 }}
            justify="space-between"
            align="center"
            color="white"
            transition="all 0.3s ease"
        >
            <div ref={logoRef}>
                <Image
                    src={getImagePath("/logos/svg/LogoWhite.svg")}
                    alt="WYN Logo"
                    width={80}
                    height={40}
                    style={{ objectFit: "contain" }}
                />
            </div>

            <HStack
                ref={linksRef}
                display={{ base: "none", md: "flex" }}
                gap={8}
                bg="whiteAlpha.200"
                backdropFilter="blur(10px)"
                py={3}
                px={8}
                borderRadius="full"
                fontSize="sm"
                fontWeight="medium"
            >
                <Link color="white" _hover={{ color: "#5CBB00", textDecor: "none" }}>
                    {t('home')}
                </Link>

                <NavItem label={t('tracking')} />
                <NavItem label={t('reviews')} />
                <NavItem label={t('services')} />
                <NavItem label={t('support')} />

                <div>
                    <LanguagePicker />
                </div>
            </HStack>

            <Button
                ref={buttonRef}
                rounded="full"
                bg="#5CBB00"
                _hover={{ bg: "#68D000" }}
                color="white"
                px={6}
            >
                {t('contactUs')} <LuArrowRight />
            </Button>
        </Flex>
    );
}
