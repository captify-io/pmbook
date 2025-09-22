interface HashContextType {
    currentHash: string;
    setCurrentHash: (hash: string) => void;
}
export declare const HashContext: import("react").Context<HashContextType | undefined>;
export declare const useHashContext: () => HashContextType;
export {};
