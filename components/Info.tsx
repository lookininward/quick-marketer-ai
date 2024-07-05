import React from 'react'
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function Info({ msg, learnMoreLink }: { msg: string, children?: React.ReactNode, learnMoreLink?: string }) {
    return (
        <section className="flex justify-center">
            <div className="p-4 px-10 max-w-3xl border rounded-md flex justify-between items-center gap-x-3">
                <InformationCircleIcon className="h-24 w-100 inline-block mr-2 text-blue-700" />
                <p className="text-sm text-gray-500">
                    {msg}{` `}
                    {learnMoreLink && (
                        <Link href="/learn-more" className="text-blue-700">
                            Learn more
                        </Link>
                    )}
                </p>
            </div>
        </section>
    )
}

export default Info