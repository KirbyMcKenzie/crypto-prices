import React, { FC } from 'react';
import { Flex } from '@chakra-ui/react';

const MainView: FC = ({ children, ...props }) => {
    return (
        <Flex
            as="main"
            flex={1}
            alignItems="center"
            justifyContent="center"
            maxWidth={1200}
            margin="auto"
            {...props}
        >
            {children}
        </Flex>
    )
};

export default MainView;