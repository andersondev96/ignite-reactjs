import { Box, Flex, Center, Heading } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { Banner } from "../components/Banner";
import { Header } from "../components/Header";
import { Slider } from "../components/Slider";
import { TravelInfos } from "../components/TravelInfos";

export default function Home() {


  return (

    <Box>
      <Head>
        <title>worldtrip</title>
      </Head>

      <Header />
      <Banner />

      <Box
        maxW={1240}
        mx="auto"
        mt="24"
        mb="10"

      >

        <TravelInfos />

        <Center border="1px" w="90px" mx="auto" bg="gray.600" />

        <Box>
          <Heading
            as="h1"
            fontWeight="400"
            fontSize={["xl", "4xl"]}
            textAlign="center"
            mt="52px"
            lineHeight={["30px", "3.375rem"]}
          >
            Vamos nessa ? <br />
            Então escolha o seu continente
          </Heading>

          <Flex
            w="100%"
            h={[250, 450]}
            mt="10"
            mb="20"

          >
            <Slider />

          </Flex>
        </Box>


      </Box>

    </Box>
  )
}
