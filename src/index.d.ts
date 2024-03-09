import type { Context } from 'react';
import type { ReactReduxContextValue } from 'react-redux';
import type { AxiosInstance, AxiosStatic } from 'axios';

export const Provider: React.FC;

export const useActions: () => {
  request: Action;
  dispatch: Action;
};

export const useSelectors: (module: string, prop: string) => any;

export const ReducersProvider: React.Context<any>;

export const api: AxiosInstance;

export const axios: AxiosStatic;

export const retrieveAuthHeaders: (
  retrieveData: (key: string) => Promise<string | null>
) => () => Promise<any>;

export const persistData: (key: string, value: string) => Promise<void>

export const removeData: (key: string) => Promise<void>;

export const retrieveData: (key: string) => Promise<string | null>;

export const clearAuthHeaders: (
  removeData: (key: string) => Promise<void>
) => void;

export const ReactReduxContext: Context<ReactReduxContextValue>;
 
type Action = (actions: {
  action: any,
  data?: any,
  options?: {
    onSuccess?: (data: any) => void;
    onError?: (message: string) => void;
  }
}) => void;