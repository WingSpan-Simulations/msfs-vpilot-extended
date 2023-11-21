export const checkSimVarLoaded: Promise<boolean> = new Promise(resolve => {
    const interval = setInterval(() => {
        if (window.simvar !== undefined) {
            clearInterval(interval);
            resolve(true);
        }
    });
});