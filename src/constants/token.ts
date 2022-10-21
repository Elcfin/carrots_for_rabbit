const PREFIX = "CARROTS";

const getStorageKey = (storageKey: string) => `${PREFIX}-${storageKey}`;

export const TOKEN_KEY = getStorageKey("TOKEN");
