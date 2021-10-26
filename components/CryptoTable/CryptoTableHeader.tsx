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
        fontSize={{ base: "xx-large", md: "xxx-large" }}
        fontWeight="extrabold"
        marginBottom={2}
        marginX={{ base: 2, md: 0 }}
      >
        {"Crypto by Market Cap"}
      </Heading>

      <Flex alignItems="center">
        <Text
          fontWeight="bold"
          fontSize="large"
          color="gray.500"
          marginX={{ base: 2, md: 0 }}
        >
          {"In the past 24 hours"}
        </Text>
        <Fade in={isLoading} unmountOnExit>
          <Spinner marginLeft={2} marginTop={1} size="xs" color="blue.500" />
        </Fade>
      </Flex>

      <ApiStatusSwitch
        onChangeApiStatus={onChangeApiStatus}
        isApiEnabled={isApiEnabled}
      />
    </>
  );
};

export default CryptoTableHeader;
