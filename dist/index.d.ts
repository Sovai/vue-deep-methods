interface RegisterOptions {
    id: string;
    methods: Record<string, Function>;
    overwrite?: boolean;
}
interface CallMethodOptions {
    id: string;
    method: string;
    args?: any[];
}
export declare function useDeepComponent(): {
    registerComponent: ({ id, methods, overwrite, }: RegisterOptions) => void;
    unregisterComponent: (id: string) => void;
    getComponent: (id: string) => Record<string, Function>;
    callComponentMethod: ({ id, method, args, }: CallMethodOptions) => Promise<any>;
};
export {};
//# sourceMappingURL=index.d.ts.map