import React from 'react'

function NotFound({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex justify-center">
            <p className="mt-4 mb-10 max-w-3xl text-sm text-gray-500">
                No Results.{` `}
                {children}
            </p>
        </section>
    )
}

export default NotFound