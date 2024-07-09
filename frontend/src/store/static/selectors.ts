import type { RootState } from "store";

export const selectIcons = (state: RootState) => state.static.icons;
export const selectBackgrounds = (state: RootState) => state.static.backgrounds;
