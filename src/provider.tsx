'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import React from "react"


export const SessionProviderWrapper = ({children}: {children: React.ReactNode}) => {
    const queryClient = new QueryClient();

    return (
        <SessionProvider>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
        </SessionProvider>
    )
}