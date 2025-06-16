import { create } from 'zustand';

type CreateWorkSpaceStore = {
  name: string;
  imageUrl: string;
  updateImageUrl: (url: string) => void;
  updateValues: (values: Partial<CreateWorkSpaceStore>) => void;
  currStep: number;
  setCurrStep: (step: number) => void;
};

export const useCreateWorkspaceValues = create<CreateWorkSpaceStore>((set) => ({
  name: '',
  imageUrl: '',
  updateImageUrl: (url) => set({ imageUrl: url }),
  updateValues: (values) => set(values),
  currStep: 1,
  setCurrStep: (step) => set({ currStep: step }),
}));
