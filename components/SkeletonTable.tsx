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
                    <TableCell>
                        <Skeleton className="w-full py-3" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="w-full py-3" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="w-full py-3" />
                    </TableCell>
                </TableRow>
            ))}
        </>
    )
}

export default SkeletonTable