import { Box, Flex, Grid, Heading, HStack, Text, useBreakpointValue } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { Card } from "../../components/Card";
import { ContinentInfos } from "../../components/ContinentInfos";
import { Header } from "../../components/Header";
import { api } from "../../services/api";

type ContinentType = {
  id: number;
  name: string;
  description: string;
  bannerImage: string;
  numberOfCountries: number;
  numberOfLanguages: number;
  amountMostPopularCities: number;
  mostPopularCities: [{
    cityName: string;
    countryName: string;
    cityImage: string;
    countryCode: string;
  }]
}

interface ContinentProps {
  continent: ContinentType;
}

export default function Continents({ continent }: ContinentProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })
  
  return (
    <Box>
      <Head>
        <title>{continent.name}</title>
      </Head>

      <Header hasBackLink />
      <Box
        backgroundImage={`url(${continent.bannerImage})`}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        h={["150px", "500px"]}
      >

        <Box
          maxW="1240"
          h="100%"
          mx="auto"
          px={10}
          pos="relative"
        >

          <Heading
            as="h1"
            fontWeight="600"
            fontSize={["3xl", "5xl"]}
            color="gray.50"
            position="absolute"
            bottom="60px"
          >
            {continent.name}
          </Heading>
        </Box>
      </Box>

      <Box
        maxW={1240}
        h="100%"
        mx="auto"
        px={["4","10"]}
      >

        <Flex
          direction={["column", "row"]}
          align="center"
          justify={"space-between"}
          mt={["6", "20"]}
          mb={["8", "20"]}
        >
          <Text
            maxW="600"
            fontSize={["xl", "2xl"]}
            lineHeight={["2", "9"]}
            textAlign="justify"
            fontWeight="400"
            mx="auto"
          >
            {continent.description}
          </Text>

          <HStack spacing={10} mt={["4", "0"]} ml={["0", "70"]}>

            <ContinentInfos numberOf={continent.numberOfCountries} legend="países" />
            <ContinentInfos numberOf={continent.numberOfLanguages} legend="línguas" />
            <ContinentInfos numberOf={continent.amountMostPopularCities} legend="cidades +100" hasTooltip />

          </HStack>

        </Flex>

        <Box>
          <Heading
            as="h1"
            fontWeight="500"
            fontSize={["2xl", "4xl"]}
            color="gray.600"
            mb="40px"
          >
            Cidades +100
          </Heading>
          <Grid 
            templateColumns={[ "repeat(1, 1fr)", "repeat(4, 1fr)"]} 
            gap={[6, 10]} my={["5px", "45px"]}
            mx={["30px", "15px"]}
            >
            {continent.mostPopularCities.map((city) => (
              <Card
              key={city.cityName}
              imageUrl={city.cityImage}
              country={city.countryName}
              cityName={city.cityName}
              countryCode={city.countryCode}
            />
            ))}
            
          </Grid>



        </Box>
      </Box>


    </Box>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { continent } = params;

  const response = await api.get(`/continents?slug=${continent}`);

  const continentInfos: ContinentType = response.data[0];

  return {
    props: {
      continent: continentInfos
    }
  }
}