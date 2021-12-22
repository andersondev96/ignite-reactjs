import { Flex, Image, Icon, Link } from "@chakra-ui/react";
import { AiOutlineLeft } from 'react-icons/ai';

interface HeaderProps {
  hasBackLink?: boolean;
}

export function Header({ hasBackLink = false }: HeaderProps) {
  
  return (
    <Flex
      width="100%"
      height="20"
      as="header"
      maxWidth={1480}
      mx="auto"
      mt="4"
      px="6"
      align="center"
      justify="center"
    >

      {hasBackLink && (
        <Link href="/" 
          position={"absolute" }
          left={["1rem", "2.5rem"]}
        >
          
            <Icon as={AiOutlineLeft} />
          
        </Link>
      )}

      <Image
        src="/images/logo.svg"
        alt="logo"
      />

    </Flex>
  )
}