import { createSelector } from "reselect";

const selectDirecotry = state => state.directory;

export const selectDirecotrySection = createSelector(
    [selectDirecotry],
    directory => directory.sections
)