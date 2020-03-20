export const TERM_GROUP_REQUEST = 'TERM_GROUP_REQUEST';
export const TERM_GROUP_REQUEST_SSH = 'TERM_GROUP_REQUEST_SSH';
export const TERM_GROUP_EXIT = 'TERM_GROUP_EXIT';
export const TERM_GROUP_RESIZE = 'TERM_GROUP_RESIZE';
export const TERM_GROUP_EXIT_ACTIVE = 'TERM_GROUP_EXIT_ACTIVE';
export const DIRECTION = {
  HORIZONTAL: 'HORIZONTAL',
  VERTICAL: 'VERTICAL'
};

export interface TermGroupRequestAction {
  type: typeof TERM_GROUP_REQUEST;
}

export interface TermGroupRequestSshAction {
  type: typeof TERM_GROUP_REQUEST_SSH;
}

export interface TermGroupExitAction {
  type: typeof TERM_GROUP_EXIT;
  uid: string;
}
export interface TermGroupResizeAction {
  type: typeof TERM_GROUP_RESIZE;
  uid: string;
  sizes: number[];
}
export interface TermGroupExitActiveAction {
  type: typeof TERM_GROUP_EXIT_ACTIVE;
}

export type TermGroupActions =
  | TermGroupRequestAction
  | TermGroupRequestSshAction
  | TermGroupExitAction
  | TermGroupResizeAction
  | TermGroupExitActiveAction;
