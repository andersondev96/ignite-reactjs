import { Flex, Image, Text } from "@chakra-ui/react";

interface TravelTypesProps {
  title: string;
  image: string;
}

export function TravelTypes({ title, image }: TravelTypesProps) {
  return (
    <Flex
      align="center"
      direction="column"
    >
      <Image 
        mx="85"
        src={image}
        alt={title}
      />

      <Text
        mt="2"
        fontWeight="500"
        fontSize="xl"
      >{title}</Text>
    </Flex>

  )
}