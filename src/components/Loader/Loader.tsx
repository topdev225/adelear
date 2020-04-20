import React from 'react';
import { isLoading, getErrorMessage } from '@Modules';
import { connectStore } from '@Store';

// Types Import
import {
  ActionCreatorType,
  SelectorType,
  MapStateToPropsType,
  StateType
} from '@Types';

type OwnProps = {
  actionCreator: ActionCreatorType;
  selector: SelectorType;
  silent?: boolean;
};

type LoaderProps = {
  loading: boolean;
  silent?: boolean;
  error?: string;
  result: any;
  children: Function;
};

const mapState: MapStateToPropsType = (
  state: StateType,
  { actionCreator, selector, silent }: OwnProps
) => ({
  loading: isLoading(actionCreator)(state),
  silent,
  result: selector(state),
  error: getErrorMessage(actionCreator)(state)
});

const Loader = ({ loading, silent, error, result, children }: LoaderProps) =>
  loading && !silent ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>Somethign went wrong</div>
  ) : (
    children(result)
  );

export default connectStore(mapState)(Loader);
