// src/t-writer.d.ts
declare module 't-writer.js' {
    export default class Typewriter {
        constructor(element: HTMLElement, options?: any);
        start(): void;
        stop(): void;
        pause(): void;
        resume(): void;
        type(text: string): void;
    }
}