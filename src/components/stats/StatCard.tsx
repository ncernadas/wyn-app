"use client";

import { Flex, Circle, Icon, Heading, Text } from "@chakra-ui/react";

interface StatCardProps {
    icon: any;
    number: string;
    label: string;
}

export function StatCard({ icon, number, label }: StatCardProps) {
    return (
        <Flex direction="column" align="center" textAlign="center" position="relative" zIndex={2}>
            <Circle
                size="80px"
                bg="#5CBB00"
                color="white"
                mb={6}
                boxShadow="0 10px 15px -3px rgba(84, 237, 54, 0.4)"
            >
                <Icon as={icon} boxSize={8} strokeWidth={1.5} />
            </Circle>

            <Heading as="h3" size="xl" mb={2} fontWeight="bold">
                {number}
            </Heading>

            <Text color="gray.500" fontWeight="medium">
                {label}
            </Text>
        </Flex>
    );
}
