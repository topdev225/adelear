import React, { ReactElement } from "react";
import { useStore } from "@Contexts";

// Types Import
import {
  MapDispatchToPropsType,
  MapStateToPropsType,
  ThunkActionCreatorType,
  StandardActionCreatorType
} from "@Types";

function connectStore(
  mapStateToProps?: MapStateToPropsType,
  mapDispatchToProps?: MapDispatchToPropsType
) {
  return function(Component: any) {
    return function(props: any): ReactElement {
      const [state, dispatch] = useStore();

      const stateToProps = mapStateToProps
        ? mapStateToProps(state, props)
        : props;

      let dispatchToProps = {};
      if (mapDispatchToProps) {
        if (typeof mapDispatchToProps === "function") {
          dispatchToProps = mapDispatchToProps(dispatch);
        } else {
          dispatchToProps = Object.keys(mapDispatchToProps).reduce(
            (memo, key) => {
              if (mapDispatchToProps[key].prototype.isThunk()) {
                const actionCreator = mapDispatchToProps[
                  key
                ] as ThunkActionCreatorType;
                return {
                  ...memo,
                  [key]: (...args: any[]) => actionCreator(...args)(dispatch)
                };
              } else {
                const actionCreator = mapDispatchToProps[
                  key
                ] as StandardActionCreatorType;
                return {
                  ...memo,
                  [key]: (...args: any[]) => dispatch(actionCreator(...args))
                };
              }
            },
            {}
          );
        }
      }

      const enhancedprops = { ...props, ...stateToProps, ...dispatchToProps };

      return <Component {...enhancedprops} />;
    };
  };
}

export default connectStore;
