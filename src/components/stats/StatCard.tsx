"use client";

import { Flex, Circle, Icon, Heading, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StatCardProps {
    icon: any;
    number: string;
    label: string;
}

export function StatCard({ icon, number, label }: StatCardProps) {
    const [displayNumber, setDisplayNumber] = useState("0");
    const numberRef = useRef<HTMLHeadingElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const circle = circleRef.current;
        const numberElement = numberRef.current;

        if (!card || !circle || !numberElement) return;

        const match = number.match(/^(\d+\.?\d*)(.*)$/);
        if (!match) return;

        const numericValue = parseFloat(match[1]);
        const suffix = match[2];

        const counter = { value: 0 };

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play reverse play reverse",
            }
        });

        tl.to(circle, {
            rotation: 360,
            duration: 1,
            ease: "back.out(1.4)"
        })
  
        .to(circle, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out"
        }, "-=0.7")
        .to(circle, {
            scale: 1,
            duration: 0.3,
            ease: "power2.in"
        }, "-=0.4")
    
        .to(counter, {
            value: numericValue,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
                const currentValue = counter.value.toFixed(1);
                setDisplayNumber(currentValue + suffix);
            },
            onReverseComplete: () => {
                setDisplayNumber("0" + suffix);
            }
        }, "-=1.2");

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            tl.kill();
        };
    }, [number]);

    return (
        <Flex
            ref={cardRef}
            direction="column"
            align="center"
            textAlign="center"
            position="relative"
            zIndex={2}
        >
            <Circle
                ref={circleRef}
                size="80px"
                bg="#5CBB00"
                color="white"
                mb={6}
                boxShadow="0 10px 15px -3px rgba(84, 237, 54, 0.4)"
            >
                <Icon as={icon} boxSize={8} strokeWidth={1.5} />
            </Circle>

            <Heading ref={numberRef} as="h3" size="xl" mb={2} fontWeight="bold">
                {displayNumber}
            </Heading>

            <Text color="gray.500" fontWeight="medium">
                {label}
            </Text>
        </Flex>
    );
}
