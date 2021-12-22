import { Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import { FiInfo } from 'react-icons/fi';

interface ContinentsInfosProps {
  numberOf: number;
  legend: string;
  hasTooltip?: boolean;
}

export function ContinentInfos({ numberOf, legend, hasTooltip }: ContinentsInfosProps) {
  return (

    <Flex 
      direction="column" 
      align={["flex-start", "center"]} 
      px={["0", "2"]}
    >
      <Text
        as="span"
        fontWeight="600"
        fontSize={["2xl", "5xl"]}
        color="yellow.500"
      >
        {numberOf}
      </Text>
      {hasTooltip ? (
        <Flex align="center">
          <Text
            fontSize={["lg", "2xl"]}
            fontWeight={["400", "600"]}
          >
            {legend}
          </Text>

          <Tooltip label="100 cidades mais visitadas no mundo" bg="gray.600" color="gray.500">
            <span>
              <Icon as={FiInfo} fontSize={["xs", "md"]} opacity="0.5" ml="5px" />
            </span>
          </Tooltip>
        </Flex>
      ) : (
        <Text
          fontSize={["lg", "2xl"]}
          fontWeight={["400", "600"]}>
          {legend}
        </Text>
      )}
    </Flex>
  )
}