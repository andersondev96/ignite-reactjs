import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { TravelTypes } from "./TravelTypes";

export function TravelInfos() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })
  
  return (
    <Flex
      px={["12", "10"]}
      mb={["9", "20"]}
      justify="space-between"
      wrap={isWideVersion ? 'nowrap' : 'wrap'}

    >
      <TravelTypes
        title="vida noturna"
        image="/images/cocktail.svg"
      />

      <TravelTypes
        title="praia"
        image="/images/surf.svg"
      />

      <TravelTypes
        title="moderno"
        image="/images/building.svg"
      />

      <TravelTypes
        title="clássico"
        image="/images/museum.svg"
      />

      <TravelTypes
        title="e mais..."
        image="/images/earth.svg"
      />
    </Flex>
  )
}