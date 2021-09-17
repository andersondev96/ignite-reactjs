import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Anderson Fernandes</Text>
          <Text color="gray-300" fontSize="small">
            anderson@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Anderson Fernandes"
        src="https://avatars.githubusercontent.com/u/49786548?v=4"
      />
    </Flex>
  );
}