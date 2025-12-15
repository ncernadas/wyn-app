"use client";

import { HStack, Text, Icon } from "@chakra-ui/react";
import { LuChevronDown } from "react-icons/lu";

interface NavItemProps {
    label: string;
    hasDropdown?: boolean;
}

export function NavItem({ label, hasDropdown }: NavItemProps) {
    return (
        <HStack
            gap={1}
            cursor="pointer"
            _hover={{ color: "#5CBB00" }}
            transition="color 0.2s"
        >
            <Text>{label}</Text>
            {hasDropdown && <Icon as={LuChevronDown} boxSize={4} />}
        </HStack>
    );
}
