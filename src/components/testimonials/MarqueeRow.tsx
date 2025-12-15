'use client';

import { Box, Flex } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { ReviewCard } from './ReviewCard';

const scrollLeft = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

const scrollRight = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0); }
`;

export const MarqueeRow = ({
  reviews,
  direction = 'left',
  speed = 40,
}: {
  reviews: any[];
  direction?: 'left' | 'right';
  speed?: number;
}) => {
  const animation = `${direction === 'left' ? scrollLeft : scrollRight} ${speed}s linear infinite`;

  return (
    <Box
      overflow="hidden"
      w="full"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '100px',
        background: 'linear-gradient(to right, white, transparent)',
        zIndex: 2,
        pointerEvents: 'none',
      }}
      _after={{
        content: '""',
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '100px',
        background: 'linear-gradient(to left, white, transparent)',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      <Flex
        w="max-content"
        animation={animation}
        _hover={{ animationPlayState: 'paused' }}
        py={4}
      >
        <Flex>
          {reviews.map(r => (
            <ReviewCard key={`original-${r.id}`} review={r} />
          ))}
        </Flex>

        <Flex>
          {reviews.map(r => (
            <ReviewCard key={`copy-${r.id}`} review={r} />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};
