import { Flex, Heading, Text, Link } from '@chakra-ui/react';

interface SlideItemProps {
  title: string;
  description: string;
  imageUrl: string;
  imageLink: string;
}

export function SlideItem({ title, description, imageUrl, imageLink }: SlideItemProps) {
  return (
    <Link 
      href={`continents/${imageLink}`}  
    >
      
        <Flex
          w="100%"
          h="100%"
          align="center"
          justify="center"
          direction="column"
          bgImage={`url(${imageUrl})`}
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          textAlign="center"

        >
          <Heading
            fontSize={["3xl", "5xl"]}
            color="gray.50"
            fontWeight="bold"
          >
            {title}
          </Heading>
          <Text
            fontWeight="bold"
            color="gray.100"
            fontSize={["xl","2xl"]}
            mt="4"
          >
            {description}
          </Text>
        </Flex>
      
    </Link>

  )
}