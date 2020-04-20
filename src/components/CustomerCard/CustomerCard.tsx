import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { get } from 'lodash';
import { useStyles } from './customer-card.styles';
import { colors } from '@Theme';

// Module Import
import { loadingStateSelector, selectSystem, deselectSystem } from '@Modules';
import { connectStore } from '@Store';
import { MapStateToPropsType, StateType } from '@Types';

type Customer = {
  phaseSystemId: number;
  systemId: number;
  label: string;
  path: string;
  selected?: any;
};

type CustomerCardProps = {
  loadingStateForSelect: any;
  loadingStateForDeselect: any;
  selected?: boolean;
  customer?: Customer;
  emptyCard?: boolean;
  onClick?: () => void;
};

const mapState: MapStateToPropsType = (state: StateType) => ({
  loadingStateForSelect: loadingStateSelector(selectSystem)(state),
  loadingStateForDeselect: loadingStateSelector(deselectSystem)(state)
});

const CustomerCard: React.FunctionComponent<CustomerCardProps> = ({
  loadingStateForSelect,
  loadingStateForDeselect,
  selected,
  customer,
  emptyCard,
  onClick
}) => {
  const classes = useStyles({});

  const isSelecting = get(
    loadingStateForSelect,
    `meta.${customer.phaseSystemId}`,
    false
  );
  const isDeselecting =
    customer.selected &&
    get(loadingStateForDeselect, `meta.${customer.selected.id}`, false);

  return (
    <Box
      border={1}
      borderRadius={10}
      borderColor={selected ? colors.border.green : colors.border.light}
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={1}
      className={
        emptyCard
          ? classes.emptyCard
          : selected
          ? classes.selectedCustomerBox
          : classes.customerBox
      }
      onClick={onClick}
    >
      {isSelecting || isDeselecting ? (
        <div className={classes.image}>
          <CircularProgress color="primary" />
        </div>
      ) : (
        <>
          {emptyCard ? (
            <div className={classes.image}>
              <span>Coming soon...</span>
            </div>
          ) : (
            <div className={classes.image}>
              <img alt="" title={customer.label} src={customer.path} />
            </div>
          )}
          {selected && (
            <Box position="absolute" right={2} top={2}>
              <CheckCircleIcon className={classes.checkbox} />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default connectStore(mapState)(CustomerCard);
