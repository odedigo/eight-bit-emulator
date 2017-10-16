/*
 * Project: Eight Bit CPU Emulator
 *
 *
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Tue Oct 03 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */
export interface IListenerCallback {
    (value?: any): void;
}

export interface IUnsubscribeCallback {
    (): void;
}
