import React from "react";
import { ServiceCard } from "@Components";
import {
  Card,
  Container,
  Grid,
  Box,
  CircularProgress
} from "@material-ui/core";
import { colors } from "@Theme";
import {
  AlteryxLogoIcon,
  AwsLogoIcon,
  AzureLogoIcon,
  PowerbiLogoIcon,
  TableauLogoIcon
} from "@Icons";
import { PageContainer } from "@Components";
import { useUser } from "@Contexts";
import { useStyles } from "./roadmap.styles";

// Context Import
import { BestHeightProvider } from "@Contexts";

type RoadmapProps = {
  categoriedSystems: Array<any>;
  isLoading: boolean;
};

const Roadmap = ({ categoriedSystems, isLoading }: RoadmapProps) => {
  const phases = categoriedSystems;
  const classes = useStyles({});
  const { user } = useUser();

  return (
    <PageContainer
      sideNavIsVisible={Boolean(user)}
      backgroundColor={user ? colors.blue.medium : colors.blue.dark}
    >
      <Container maxWidth="xl" className={classes.serviceContainer}>
        <Grid alignItems="center" container direction="row" justify="center">
          <Grid item>
            <h2 className={classes.sectionHeader}>The Connected Enterprise</h2>
          </Grid>
        </Grid>
        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <BestHeightProvider>
            <Grid
              alignItems="center"
              container
              direction="row"
              justify="space-evenly"
              spacing={1}
              className={classes.serviceRow}
            >
              {phases
                .filter((_, index) => index < 3)
                .map(service => {
                  return (
                    <Grid key={service.phaseId} item>
                      <ServiceCard {...service} />
                    </Grid>
                  );
                })}
              <Grid item>
                <Card className={classes.servicesPoweredByContainer}>
                  <div className={classes.servicesPoweredByBubble}>
                    <div>POWERED BY</div>
                    <div>
                      <AzureLogoIcon fill={colors.white.light} />
                    </div>
                    <div>- OR -</div>
                    <div>
                      <AwsLogoIcon fill={colors.white.light} />
                    </div>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </BestHeightProvider>
        )}
        {!isLoading && (
          <BestHeightProvider>
            <Grid
              alignItems="center"
              container
              direction="row"
              justify="space-evenly"
              spacing={1}
              className={classes.serviceRow}
            >
              {phases
                .filter((_, index) => index >= 3)
                .map(service => {
                  return (
                    <Grid key={service.phaseId} item>
                      <ServiceCard {...service} />
                    </Grid>
                  );
                })}
            </Grid>
          </BestHeightProvider>
        )}
      </Container>
      <Container maxWidth="xl" className={classes.footerContainer}>
        <div className={classes.footerHeader}>
          ORGANIZE &amp; VISUALIZED USING
        </div>
        <div className={classes.footerContent}>
          <div>
            <TableauLogoIcon fill={colors.white.light} />
          </div>
          <div>
            <PowerbiLogoIcon fill={colors.white.light} />
          </div>
          <div>
            <AlteryxLogoIcon fill={colors.white.light} />
          </div>
        </div>
      </Container>
    </PageContainer>
  );
};

Roadmap.displayName = "Roadmap";

export default Roadmap;
