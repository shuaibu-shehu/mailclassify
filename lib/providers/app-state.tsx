'use client';

import { mailType } from '@/components/mail-lists';
import React, {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';


interface AppState {
    mails: mailType[];
    maxMails: number;
  }

  type action = {
    type: 'SET_MAILS';
    payload: mailType[];
  } | {
    type: 'UPDATE_MAX_MAILS';
    payload: number;
  };


    const initialState: AppState = {
        mails: [],
        maxMails: 10,
    };


    const appStateReducer = (state: AppState, action: action): AppState => {
        switch (action.type) {
          case 'SET_MAILS':
            return { ...state, mails: action.payload };
         
          case 'UPDATE_MAX_MAILS':
            return { ...state, maxMails: action.payload};
            default:
            return state;
        }
      };


    const AppStateContext = createContext<{
        state: AppState;
        dispatch: Dispatch<action>;
      } | undefined>(undefined);

      interface AppStateProviderProps {
        children: React.ReactNode;
      }

      const AppStateProvider = ({ children }: AppStateProviderProps) => {
        const [state, dispatch] = useReducer(appStateReducer, initialState);

        return (
          <AppStateContext.Provider value={{ state, dispatch }}>
            {children}
          </AppStateContext.Provider>
        );
      }

export default AppStateProvider;

      export const useAppState = () => {
        const context = useContext(AppStateContext);
        if (!context) {
          throw new Error('useAppState must be used within an AppStateProvider');
        }
        return context;
      };
   