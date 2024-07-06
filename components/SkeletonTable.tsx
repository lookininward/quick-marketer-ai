import React from 'react'
import { Skeleton } from "@/components/ui/skeleton";
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"

function SkeletonTable() {
    return (
        <>
            {[...Array(3)].map((_, index) => (
                <TableRow key={index}>
                    <TableCell className="w-1/4">
                        <Skeleton className="py-3" />
                    </TableCell>
                    <TableCell className="w-2/4">
                        <Skeleton className="py-3" />
                    </TableCell>
                    <TableCell className="w-full">
                        <Skeleton className="py-3" />
                    </TableCell>
                </TableRow>
            ))}
        </>
    )
}

export default SkeletonTable