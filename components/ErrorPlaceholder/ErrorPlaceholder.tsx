import React, { FC } from "react";
import { Box, Button, Fade, Flex, Text, IconProps } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

export interface Props {
  icon?: FC<IconProps>;
  title: string;
  subtitle?: string;
  onRetry?: () => void;
}

const ErrorPlaceholder: FC<Props> = ({
  icon = WarningIcon,
  title = "There was an issue",
  subtitle,
  onRetry,
}) => {
  const Icon = icon;
  return (
    <Fade in unmountOnExit>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        marginTop={20}
      >
        <Icon height={14} width={14} marginBottom={2} color="red.500" />
        <Text fontSize="xl" fontWeight="bold">
          {title}
        </Text>

        {subtitle && (
          <Text
            color="gray.500"
            fontSize="md"
            fontWeight="medium"
            marginTop={1}
          >
            {subtitle}
          </Text>
        )}

        {onRetry && (
          <Button colorScheme="gray" marginTop={3} onClick={onRetry}>
            {"Try again"}
          </Button>
        )}
      </Flex>
    </Fade>
  );
};

export default ErrorPlaceholder;
