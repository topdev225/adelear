import React, { createContext, useContext, useReducer } from 'react';

const BestHeightContext = createContext(undefined);

const bestHeightReducer = (state: any, action: any) => {
  if (action.type === 'MEMO_HEIGHT') {
    if (!action.payload.height) return state;
    const newState = {
      ...state,
      [action.payload.id]: action.payload.height
    };
    const bestHeight = Math.max(
      ...Object.keys(newState).map(id => parseInt(newState[id]))
    );
    newState.bestHeight = bestHeight;
    return newState;
  }
};

const BestHeightProvider = (props: any) => {
  const [heights, dispatch] = useReducer(bestHeightReducer, {});

  return (
    <BestHeightContext.Provider
      value={{
        bestHeight: heights.bestHeight,
        postHeight: (id: number, height: number) => {
          dispatch({
            type: 'MEMO_HEIGHT',
            payload: {
              id,
              height
            }
          });
        }
      }}
      {...props}
    />
  );
};

const useBestHeight = () => useContext(BestHeightContext);

export { BestHeightProvider, useBestHeight };
