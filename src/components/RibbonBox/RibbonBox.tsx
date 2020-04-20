import React from 'react';
import { Box, useMediaQuery, Theme } from '@material-ui/core';
import { SizeMe } from 'react-sizeme';
import { colors } from '@Theme';
import { useStyles } from './ribbon-box.styles';

interface RibbonBoxProps {
  title: string;
  isFirstBox?: boolean;
}

const THRESHOLD = 30;

const RibbonBox: React.FunctionComponent<RibbonBoxProps> = ({
  title,
  isFirstBox = false,
  children
}) => {
  const classes = useStyles({});
  const isNotDesktop = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  return (
    <SizeMe>
      {({ size: parentSize }) => (
        <Box
          flexGrow={1}
          height="100%"
          border={1}
          borderColor={colors.border.light}
          borderLeft={isNotDesktop ? 1 : isFirstBox ? 1 : 0}
          borderTop={!isNotDesktop ? 1 : isFirstBox ? 1 : 0}
          px={2}
          py={3}
          position="relative"
          className={classes.container}
        >
          <SizeMe>
            {({ size: childSize }) => {
              const isOverflow =
                parentSize.width <= childSize.width + THRESHOLD;
              return (
                <Box
                  border={1}
                  borderColor={colors.border.light}
                  px={1}
                  position="absolute"
                  left={0}
                  top={-12}
                  ml={2}
                  bgcolor={colors.gray.extraLight}
                  className={`${classes.ribbonTitleBox} ${
                    isOverflow ? classes.textEllipsis : ''
                  }`}
                  style={
                    isOverflow
                      ? {
                          maxWidth: parentSize.width - THRESHOLD
                        }
                      : {}
                  }
                >
                  <span className={classes.ribbonTitle}>{title}</span>
                </Box>
              );
            }}
          </SizeMe>
          {children}
        </Box>
      )}
    </SizeMe>
  );
};

export default RibbonBox;
