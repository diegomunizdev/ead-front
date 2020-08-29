/**
 * Action types
 */
export enum LayoutTypes {
    CHANGE_USERNAME = '@layout/CHANGE_USERNAME',
}

/**
 * State type
 */
export interface ILayoutState {
    readonly username: string
}