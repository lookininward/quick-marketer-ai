import { PlatformEnum } from '@/types/platform';
import { createContext, useState, useContext, ReactNode } from 'react';

type FreeCreateContextType = {
    isGenerating: boolean;
    setIsGenerating: (isGenerating: boolean) => void;
    selectedPlatform: PlatformEnum;
    setSelectedPlatform: (platform: PlatformEnum) => void;
    numGenerations: number;
    setNumGenerations: (numGenerations: number) => void;
};

const FreeCreateContext = createContext<FreeCreateContextType>({
    isGenerating: false,
    setIsGenerating: () => { },
    selectedPlatform: PlatformEnum.Twitter,
    setSelectedPlatform: () => { },
    numGenerations: 0,
    setNumGenerations: () => { }
});

export const FreeCreateProvider = ({ children }: { children: ReactNode }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState<PlatformEnum>(PlatformEnum.Twitter);
    const [numGenerations, setNumGenerations] = useState(0);

    return (
        <FreeCreateContext.Provider value={{
            isGenerating,
            setIsGenerating,
            selectedPlatform,
            setSelectedPlatform,
            numGenerations,
            setNumGenerations
        }}>
            {children}
        </FreeCreateContext.Provider>
    );
};

export const useFreeCreateContext = () => {
    const context = useContext(FreeCreateContext);
    if (!context) {
        throw new Error('useFreeCreateContext must be used within a FreeCreateProvider');
    }
    return context;
};
