import React, { FC } from "react";
import { Fade, Flex, Heading, Text, Spinner } from "@chakra-ui/react";
import ApiStatusSwitch from "../ApiStatusSwitch";

export interface Props {
  isLoading?: boolean;
  isApiEnabled: boolean;
  onChangeApiStatus: () => void;
}

const CryptoTableHeader: FC<Props> = ({
  isLoading = false,
  isApiEnabled = true,
  onChangeApiStatus,
}) => {
  return (
    <>
      <Heading
        as="h1"
        fontSize={{ base: "x-large", md: "xxx-large" }}
        fontWeight="extrabold"
        marginBottom={2}
        marginX={{ base: 2, md: 0 }}
      >
        {"Crypto by Market Cap"}
      </Heading>

      <Flex alignItems="center">
        <Text
          color="gray.500"
          fontSize={{ base: "medium", md: "large" }}
          fontWeight="bold"
          marginX={{ base: 2, md: 0 }}
        >
          {"In the past 24 hours"}
        </Text>
        <Fade in={isLoading} unmountOnExit>
          <Spinner
            size="xs"
            color="blue.500"
            marginLeft={{ base: 1, md: 2 }}
            marginTop={1}
          />
        </Fade>
      </Flex>

      <ApiStatusSwitch
        marginTop={1}
        marginLeft={{ base: 2, md: 0 }}
        isApiEnabled={isApiEnabled}
        onChangeApiStatus={onChangeApiStatus}
      />
    </>
  );
};

export default CryptoTableHeader;
