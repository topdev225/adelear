import React, {
  useState,
  ReactNode,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import sizeMe from 'react-sizeme';
import {
  Backdrop,
  Button,
  Card,
  Fade,
  Modal,
  Grid,
  Box
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { useStyles } from './service-card.styles';

// Context Import
import { useBestHeight } from '@Contexts';

type CustomerIcon = {
  label: string;
  path: string;
  selected: boolean;
  displayOnRoadmap: boolean;
};

type ServiceCardProps = {
  phaseId: number;
  description: string;
  icon: ReactNode;
  step: string;
  customerIcons: Array<CustomerIcon>;
  title: string;
  hideUnselected?: boolean;
  showVeryTwoOnly?: boolean;
  size: {
    width: number;
    height: number;
  };
};

const ServiceCard: React.FunctionComponent<ServiceCardProps> = ({
  phaseId,
  description,
  icon,
  step,
  customerIcons,
  title,
  hideUnselected = false,
  showVeryTwoOnly = true,
  size
}) => {
  const { bestHeight, postHeight } = useBestHeight();

  useEffect(() => {
    postHeight(phaseId, size.height);
  }, [size.height]);

  const classes = useStyles({
    cardHeight: bestHeight
  });
  const [open, setOpen] = useState(false);

  const allDisplayableSystems = useMemo(
    () =>
      customerIcons.filter(
        customerIcon => !hideUnselected || customerIcon.selected
      ),
    [customerIcons]
  );

  const veryTwoSystems = allDisplayableSystems
    .filter(system => system.displayOnRoadmap)
    .slice(0, 2);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <Card className={classes.cardContainer}>
      <Box minHeight="100px">
        <div className={classes.cardHeader}>
          <div className={classes.displayAsCol}>
            <div className={classes.cardStep}>.{step}</div>
            <div className={classes.cardTitle}>{title}</div>
          </div>
          <div>{icon}</div>
        </div>
        <p className={classes.cardDescription}>{description}</p>
      </Box>
      {showVeryTwoOnly ? (
        <>
          <div className={classes.cardCta}>
            <p>INTEGRATED DATA SOURCES</p>
            <button
              color="primary"
              className={classes.buttonLink}
              onClick={handleOpen}
            >
              SEE ALL
            </button>
          </div>
          <div className={classes.footer}>
            {veryTwoSystems.map((system, index) => (
              <img
                key={index}
                alt={system.label}
                title={system.label}
                src={system.path}
              />
            ))}
          </div>
        </>
      ) : (
        <Box py={2}>
          <Grid container spacing={2}>
            {allDisplayableSystems.map((source: any, index: number) => (
              <Grid key={`$${step}${index}`} item xs={6}>
                <img
                  alt={source.label}
                  title={source.label}
                  src={source.path}
                  height={30}
                  width="auto"
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.modalContainer}>
            <div className={classes.modalHeader}>
              <h2>{title} - Integrated Tools</h2>
              <div
                style={{ cursor: 'pointer', height: '24px' }}
                onClick={handleClose}
              >
                <Close tabIndex={0} />
              </div>
            </div>
            <div className={classes.modalBody}>
              {allDisplayableSystems.map((source: any, index: number) => {
                // TODO: add id to source for key value
                return (
                  <div key={`$${step}${index}`} className={classes.image}>
                    <img
                      alt={source.label}
                      title={source.label}
                      src={source.path}
                    />
                  </div>
                );
              })}
            </div>
            <div className={classes.modalFooter}>
              <Button
                variant="contained"
                color="primary"
                component="a"
                href="mailto:contact@adelear.com"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </Card>
  );
};

ServiceCard.displayName = 'ServiceCard';

export default sizeMe({ monitorHeight: true })(ServiceCard);
