"use client";

import { useEffect, useRef } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import HeroPackage3D from "./HeroPackage3D";
import gsap from "gsap";
import { getImagePath } from "@/imagesPath";

export default function Hero() {
  const patternRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!patternRef.current) return;

    gsap.to(patternRef.current, {
      x: "-50%",
      duration: 18,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <Box
      position="relative"
      overflow="hidden"
      bg="linear-gradient(135deg, dark.800 0%, dark.700 100%)"
      color="white"
      py={{ base: 14, md: 20 }}
      px={{ base: 6, md: 12 }}
    >
      <Box
        ref={patternRef}
        position="absolute"
        inset={0}
        zIndex={0}
        opacity={0.18}
        style={{
          backgroundImage: `url(${getImagePath('/patterns/Pattern3.png')})`,
          backgroundRepeat: "repeat",
          width: "200%",
          height: "100%",
        }}
      />

      <Flex
        position="relative"
        zIndex={1}
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        gap={{ base: 10, md: 16 }}
        maxW="7xl"
        mx="auto"
      >

        <Flex
          direction="column"
          flex="1"
          maxW={{ base: "100%", md: "620px" }}
          mt={{ base: 0, md: -4 }}
        >
          <Heading
            fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
            lineHeight="1.15"
            mb={6}
            color="bg.inverted"
          >
            Logística inteligente para un mundo en movimiento
          </Heading>

          <Text
            fontSize={{ base: "md", md: "lg" }}
            opacity={0.85}
            lineHeight="1.6"
            color="bg.inverted"
          >
            En <strong style={{ color: "#58ff8d" }}>WYN Logistics</strong>,
            optimizamos el proceso completo de entrega de paquetes para que cada
            envío llegue más rápido, más seguro y más eficiente.
          </Text>
        </Flex>

        <Box
          flex="1"
          display="flex"
          justifyContent={{ base: "center", md: "flex-end" }}
          w="100%"
          transform={{ base: "translateY(0)", md: "translateY(-20px)" }}
        >
          <HeroPackage3D />
        </Box>
      </Flex>
    </Box>
  );
}
