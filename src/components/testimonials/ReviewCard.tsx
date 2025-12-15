'use client';

import { Avatar, Box, Card, Flex, Icon, Text } from '@chakra-ui/react';
import { FaQuoteLeft } from 'react-icons/fa';

export const ReviewCard = ({ review }: { review: any }) => {
  return (
    <Card.Root
      w="350px"
      flexShrink={0}
      bg="white"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.100"
      boxShadow="sm"
      mx={3}
      h="full"
    >
      <Card.Body p={6}>
        <Icon as={FaQuoteLeft} color="#5CBB00" mb={3} fontSize="xl" />

        <Text fontSize="md" color="gray.600" mb={6} lineHeight="tall" flex={1}>
          "{review.content}"
        </Text>

        <Flex align="center" gap={4} mt="auto">
          <Avatar.Root size="md">
            <Avatar.Image src={review.avatar} />
            <Avatar.Fallback name={review.name} />
          </Avatar.Root>

          <Box>
            <Text fontWeight="bold" fontSize="sm" color="gray.900">
              {review.name}
            </Text>
            <Text fontSize="xs" color="gray.500" fontWeight="medium">
              {review.role}
            </Text>
          </Box>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
};
