import configPromise from '@payload-config'
import '@payloadcms/next/css'
import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

// @ts-ignore - arquivo que será gerado pelo payload init
import { importMap } from './admin/importMap.js'

type Args = {
    children: React.ReactNode
}

const Layout = ({ children }: Args) => (
    <RootLayout config={configPromise} importMap={importMap}>
        {children}
    </RootLayout>
)

export default Layout
