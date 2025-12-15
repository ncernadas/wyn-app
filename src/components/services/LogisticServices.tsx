'use client'

import {
    Box,
    Flex,
    Heading,
    Text,
    SimpleGrid,
    Icon,
    HStack,
    VStack,
    Avatar,
    AvatarGroup,
    IconButton,
    Tag,
    Image as ChakraImage
} from '@chakra-ui/react';
import { LuArrowDown, LuTruck, LuRocket, LuPackageCheck } from 'react-icons/lu';
import { FaStar } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { getImagePath } from '@/imagesPath';


const colors = {
    darkGreen: '#5CBB00',
    lightGreenBox: '#272726',
    coralBg: '#272726',
    tagDark: '#5CBB00',
};

const CustomTag = ({ icon: IconComponent, label }: { icon: any; label: string }) => (
    <Tag.Root
        size="lg"
        borderRadius="full"
        bg={colors.tagDark}
        color="white"
        py={3}
        px={6}
        variant="solid"
    >
        <Tag.StartElement>
            <IconComponent size={20} />
        </Tag.StartElement>
        <Tag.Label fontWeight="bold" fontSize="sm">
            {label}
        </Tag.Label>
    </Tag.Root>
);

const LogisticServices = () => {
    const t = useTranslations('services');

    return (
        <Box as="section" py={16} px={{ base: 4, md: 8 }}>
            <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                bg={colors.darkGreen}
                rounded="3xl"
                overflow="hidden"
                minH={{ lg: "600px" }}
            >

                <Flex
                    direction="column"
                    justify="center"
                    p={{ base: 8, md: 16, xl: 20 }}
                    color="white"
                >
                    <Heading
                        as="h2"
                        fontSize={{ base: "3xl", md: "4xl", xl: "5xl" }}
                        fontWeight="extrabold"
                        lineHeight="1.2"
                        mb={6}
                    >
                        {t('title')}
                    </Heading>

                    <Text fontSize="lg" opacity={0.9} mb={12} maxW="lg">
                        {t('description')}
                    </Text>

                    <Flex
                        direction={{ base: 'column', sm: 'row' }}
                        align={{ base: 'start', sm: 'center' }}
                        gap={8}
                    >

                        <IconButton
                            aria-label="Scroll down"
                            variant="outline"
                            color="white"
                            borderColor="whiteAlpha.500"
                            rounded="full"
                            size="lg"
                            h="80px"
                            w="80px"
                            _hover={{ bg: 'whiteAlpha.200' }}
                        >
                            <LuArrowDown size={32} />
                        </IconButton>

                        <HStack
                            bg={colors.lightGreenBox}
                            p={4}
                            rounded="2xl"
                            gap={6}
                        >

                            <AvatarGroup size="md" gap="-8px" borderColor={colors.lightGreenBox}>
                                <Avatar.Root size={"lg"}>
                                    <Avatar.Fallback name="Segun Adebayo" />
                                    <Avatar.Image src="https://bit.ly/sage-adebayo" />
                                </Avatar.Root>
                            </AvatarGroup>


                            <VStack align="start" gap={1}>
                                <HStack gap={1} color="orange.400">
                                    {[...Array(4)].map((_, i) => (<Icon key={i} as={FaStar} />))}
                                    <Icon as={FaStar} style={{ clipPath: 'inset(0 30% 0 0)' }} />
                                    <Text fontWeight="bold" color="white" ml={1}>4.7/5</Text>
                                </HStack>
                                <Text fontSize="sm" fontWeight="medium">{t('rating.basedOn')}</Text>
                            </VStack>
                        </HStack>
                    </Flex>
                </Flex>

                <Flex
                    bg={colors.coralBg}
                    direction="column"
                    justify="space-between"
                    align="center"
                    p={{ base: 8, md: 16 }}
                    position="relative"
                >

                    <Box
                        w="full"
                        h={{ base: "300px", lg: "400px" }}
                        bg="blackAlpha.100"
                        rounded="xl"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        mb={10}
                    >

                        <ChakraImage
                            src={getImagePath('/undraw5.svg')}
                            alt="Warehouse logistics illustration"
                            objectFit="contain"
                            maxH="450px"
                        />

                    </Box>

                    <Flex
                        wrap="wrap"
                        justify="center"
                        gap={4}
                        w="full"
                    >
                        <CustomTag icon={LuTruck} label={t('tags.delivery')} />
                        <CustomTag icon={LuRocket} label={t('tags.innovations')} />
                        <CustomTag icon={LuPackageCheck} label={t('tags.logisticsSolutions')} />
                    </Flex>
                </Flex>
            </SimpleGrid>
        </Box>
    );
};

export default LogisticServices;