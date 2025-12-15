"use client";

import { Menu, Button, Portal } from "@chakra-ui/react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { LuGlobe, LuCheck } from "react-icons/lu";
import { locales, localeNames } from "@/i18n/config";

export function LanguagePicker() {
  const currentLocale = useLocale() as (typeof locales)[number];
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === currentLocale) return;

    const pathWithoutLocale = pathname.replace(/^\/(es|en)/, "");

    const newPath = `/${newLocale}${pathWithoutLocale || ""}`;

    router.push(newPath);
    router.refresh();
  };

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          size="sm"
          color="white"
          px={3}
          display="flex"
          alignItems="center"
          gap={2}
          rounded="full"
          bg={"#5CBB00"}
           _hover={{ bg: "#68D000" }}
        >
          <LuGlobe size={16} />
          {localeNames[currentLocale]}
        </Button>
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="160px" bg="white" shadow="lg" borderRadius="md">
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel px={3} py={2} fontSize="sm" color="gray.600">
                Language
              </Menu.ItemGroupLabel>

              {locales.map((loc) => (
                <Menu.Item
                  key={loc}
                  onClick={() => handleLocaleChange(loc)}
                  value={loc}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  px={3}
                  py={2}
                  fontWeight={loc === currentLocale ? "bold" : "normal"}
                  color={loc === currentLocale ? "#5CBB00" : "gray.800"}
                  _hover={{ bg: "gray.100" }}
                >
                  {localeNames[loc]}
                  {loc === currentLocale && <LuCheck size={16} />}
                </Menu.Item>
              ))}
            </Menu.ItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
