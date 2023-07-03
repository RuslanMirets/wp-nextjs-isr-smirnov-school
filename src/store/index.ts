import { create } from "zustand";

export const useAuthTimeStore = create((set) => ({
	value: 0,
	setTime: (value: number) => set({ value: value }),
}));
