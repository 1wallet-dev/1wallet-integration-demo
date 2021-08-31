import React, { useEffect, useCallback } from "react";

export const useWindowEvent = (event: any, callback: any) => {
    const handler = (e: any) => callback(e.detail)
    useEffect(
        () => {
            window.addEventListener(event, handler);
            return () => window.removeEventListener(event, callback);
        },
        [event, callback]
    );
};