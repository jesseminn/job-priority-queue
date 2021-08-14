export type DebuggerOptions = {
    label: string;
    enabled: boolean;
};

export class Debugger {
    private label?: string;
    private enabled = false;

    constructor({ label, enabled }: DebuggerOptions) {
        this.label = `[${label}] `;
        this.enabled = enabled;
    }

    debug(...args: any[]) {
        console.log(this.label, ...args);
    }
}
