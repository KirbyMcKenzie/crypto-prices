import React, { FC } from "react";
import { Flex, Text, Switch, Tooltip } from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const tooltipExplainerText =
  "'Disables' the API by purposely updating the endpoints to return an error.";

export interface Props {
  isApiEnabled: boolean;
  onChangeApiStatus: (status: boolean) => void;
}

const ApiStatusSwitch: FC<Props> = ({
  isApiEnabled = true,
  onChangeApiStatus,
}) => {
  return (
    <Flex alignItems="center" marginTop={1}>
      <Switch
        colorScheme="green"
        isChecked={isApiEnabled}
        size="sm"
        onChange={() => onChangeApiStatus(!isApiEnabled)}
      />
      <Text
        color={isApiEnabled ? "green.500" : "gray.600"}
        fontWeight="bold"
        fontSize="sm"
        marginLeft={2}
        marginRight={1}
      >
        {`API ${isApiEnabled ? "ENABLED" : "DISABLED"}`}
      </Text>
      <Tooltip label={tooltipExplainerText}>
        <InfoOutlineIcon color="gray.600" height={3} />
      </Tooltip>
    </Flex>
  );
};

export default ApiStatusSwitch;
