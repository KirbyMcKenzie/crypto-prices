import React, { FC } from "react";
import { BoxProps, Flex, Text, Switch, Tooltip } from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const tooltipExplainerText =
  "Forces the API to throw an error by swapping out the endpoint for an invalid one.";

export interface Props extends BoxProps {
  isApiEnabled: boolean;
  onChangeApiStatus: (status: boolean) => void;
}

const ApiStatusSwitch: FC<Props> = ({
  isApiEnabled = true,
  onChangeApiStatus,
  ...props
}) => {
  return (
    <Flex alignItems="center" {...props}>
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
        <InfoOutlineIcon color="gray.500" height={3} />
      </Tooltip>
    </Flex>
  );
};

export default ApiStatusSwitch;
