import React, { useMemo } from 'react';
import { Card, Box, Grid, useMediaQuery, Theme } from '@material-ui/core';
import { RibbonBox, CustomerCard } from '@Components';
import ManualEntrySelection from './ManualEntrySelection';
import { useStyles } from './system-selection-card';

type CustomerCategory = {
  id: string;
  label: string;
};

type CustomerIcon = {
  systemId: string;
  label: string;
  path: string;
  category: Array<string>;
  selected: boolean;
};

type ServiceType = {
  phaseId: number;
  step: string;
  title: string;
  customerIcons: Array<CustomerIcon>;
  customerCategories: Array<CustomerCategory>;
};

type SystemSelectionCardProps = {
  service: ServiceType;
  onSelectSystem: Function;
  onAddOrUpdateManualEntry: Function;
  onWipeOutManualEntry: Function;
  onWipeOutAllManualEntries: Function;
};

const SystemSelectionCard: React.FunctionComponent<
  SystemSelectionCardProps
> = ({
  service,
  onSelectSystem,
  onAddOrUpdateManualEntry,
  onWipeOutManualEntry,
  onWipeOutAllManualEntries
}) => {
  const classes = useStyles({});
  const isNotDesktop = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('xs')
  );

  const categoriedCustomers: Map<string, Array<CustomerIcon>> = useMemo(() => {
    return service.customerCategories.reduce(
      (memo, category: CustomerCategory) => {
        const customers = service.customerIcons.filter(customer =>
          customer.category.includes(category.id)
        );

        memo.set(category.id, customers);
        return memo;
      },
      new Map()
    );
  }, [service]);

  const nGrid: number = 12 / service.customerCategories.length;

  return (
    <Card className={classes.cardContainer}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={1}
        pb={4}
      >
        <div>
          <span className={classes.step}>.{service.step}</span>{' '}
          <span className={classes.title}>{service.title}</span>
        </div>
        <span className={classes.selectText}>1 selected</span>
      </Box>
      <Grid container>
        {service.customerCategories.map((category, index) => {
          const customers = categoriedCustomers.get(category.id);

          return (
            <Grid
              key={category.id}
              item
              xs={isNotDesktop ? 12 : nGrid === 12 ? 6 : nGrid === 6 ? 6 : 4}
            >
              <RibbonBox title={category.label} isFirstBox={index === 0}>
                <Grid container spacing={1}>
                  {customers.length > 0 ? (
                    customers.map((customer, index) => (
                      <Grid
                        key={index}
                        item
                        xs={
                          isMobile ? 12 : nGrid === 12 ? 4 : nGrid === 6 ? 4 : 6
                        }
                      >
                        <CustomerCard
                          selected={customer.selected}
                          customer={customer}
                          onClick={onSelectSystem(customer)}
                        />
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={4}>
                      <CustomerCard key={index} emptyCard={true} />
                    </Grid>
                  )}
                </Grid>
              </RibbonBox>
            </Grid>
          );
        })}
      </Grid>
      <Box mt={2}>
        <ManualEntrySelection
          service={service}
          onAddOrUpdateManualEntry={onAddOrUpdateManualEntry}
          onWipeOutManualEntry={onWipeOutManualEntry}
          onWipeOutAllManualEntries={onWipeOutAllManualEntries}
        />
      </Box>
    </Card>
  );
};

export default SystemSelectionCard;
