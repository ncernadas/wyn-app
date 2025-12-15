"use client";

import { Flex, HStack, Button, Link } from "@chakra-ui/react";
import { LuArrowRight } from "react-icons/lu";
import { NavItem } from "./NavItem";
import { useTranslations } from 'next-intl';
import { LanguagePicker } from './LanguagePicker';
import Image from "next/image";
import { getImagePath } from "@/imagesPath";

export function Navbar() {
    const t = useTranslations('navbar');

    return (
        <Flex
            as="nav"
            position="absolute"
            top={0}
            w="full"
            zIndex={10}
            p={{ base: 4, md: 8 }}
            justify="space-between"
            align="center"
            color="white"
        >

            <Image
                src={getImagePath("/logos/svg/LogoWhite.svg")}
                alt="WYN Logo"
                width={80}
                height={40}
                style={{ objectFit: "contain" }}
            />

            <HStack
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

                <LanguagePicker />
            </HStack>

            <Button
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
