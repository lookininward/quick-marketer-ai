import React from 'react'
import { TableHeader, TableHead, TableRow } from "@/components/ui/table"

function ProductsTableHeader() {
    return (
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead></TableHead>
            </TableRow>
        </TableHeader>
    )
}

export default ProductsTableHeader