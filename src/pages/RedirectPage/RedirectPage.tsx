import React, { Props } from 'react';
import styled from 'styled-components';
import { useStyles } from './redirect-page.styles';
import { colors } from '@Theme';
import { PageContainer } from '@Components';
import { LoadingIcon } from '@Icons';

const StyledContent = styled.div`
  color: ${colors.white.light};
  text-align: center
`;

export const RedirectPage = () => {

    return (
      <PageContainer
        sideNavIsVisible={false}
        backgroundColor={colors.blue.dark}
      >
        <StyledContent >
         <h3>Please wait while you are being redirected</h3>
          <LoadingIcon />
        </StyledContent>
      </PageContainer>
    );
};
