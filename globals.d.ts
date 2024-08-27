declare global {
    interface Window {
      ga: {
        (...args: any[]): void;
        getAll: () => Array<{ get: (fieldName: string) => string }>;
      };
    }
  }
  
  export {};
  