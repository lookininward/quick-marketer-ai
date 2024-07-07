import React from 'react'
import { PlusIcon } from "@heroicons/react/24/outline";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";

function ProductsHeader({
    onSearchProducts,
    onClickCreateNewProduct
}: {
    onSearchProducts: (searchText: string) => void,
    onClickCreateNewProduct: () => void
}) {
    return (
        <>
            <h1 className="text-xl font-semibold mb-4">Product</h1>
            <div className="w-full flex justify-between items-center gap-x-3 mb-6 border py-5 px-6 rounded-md">
                <SearchBar onSearch={onSearchProducts} />
                <Button onClick={onClickCreateNewProduct}>
                    <PlusIcon className="h-4 w-4 mr-1.5" />
                    Create Product
                </Button>
            </div>
        </>
    )
}

export default ProductsHeader