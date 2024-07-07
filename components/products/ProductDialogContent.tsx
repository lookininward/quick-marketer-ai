import React from 'react'
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
// import TagForm from "@/components/tags/TagForm";
import ProductForm from "@/components/products/ProductForm";

function ProductDialogContent({
    productToEdit,
    onProductSuccess
}: {
    productToEdit?: Product | null,
    onProductSuccess: () => void
}) {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{productToEdit ? "Edit" : "Create"} Product</DialogTitle>
            </DialogHeader>
            <ProductForm
                product={productToEdit!}
                onSuccess={onProductSuccess}
            />
        </DialogContent>
    )
}

export default ProductDialogContent