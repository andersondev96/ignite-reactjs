import { Flex, Image, Text } from "@chakra-ui/react";
import ReactCountryFlag from 'react-country-flag';

interface CardProps {
  imageUrl: string;
  country: string;
  cityName: string;
  countryCode: string;

}

export function Card({ imageUrl, country, cityName, countryCode }: CardProps) {
  return (
    <Flex
      direction="column"
      width="256px"
      h="100%"
      border="1px"
      borderRadius="4"
      borderColor="yellow.500"
    >
      <Image
        src={imageUrl}
        alt={country}
        h="173"
        w="100%"
        borderRadius="4 4 0 0"
      />

      <Flex
        direction="row"
        justify="space-between"
        mt="18px"
        px="24px"
      >
        <Flex direction="column">
          <Text
            fontWeight="600"
            fontSize="xl"
          >
            {cityName}
          </Text>
          <Text fontWeight="400" color="gray.500">
            {country}
          </Text>
        </Flex>

        <ReactCountryFlag
          style={{
            fontSize: '2rem',
            lineHeight: '2rem',
            borderRadius: '50%',
            objectFit: 'cover'
          }}
          aria-label="Flag"
          countryCode={countryCode}
          svg 
        />


      </Flex>

    </Flex>
  )
}