'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Dialog } from "@/components/ui/dialog"
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useFetchProducts } from "@/query-api/queries/useFetchProducts";
import Info from "@/components/Info";
import NotFound from "@/components/NotFound";
import SkeletonTable from "@/components/SkeletonTable";
import ContactDialogContent from "@/components/ContactDialogContent";
import ProductsHeader from "@/components/products/ProductsHeader";
import ProductDialogContent from "@/components/products/ProductDialogContent";
import ProductsTableHeader from "@/components/products/ProductsTableHeader";

const PRODUCTS_INFO = "Add products to generate product-specific content. Use products to categorize content based on specific themes, target audiences, or campaign objectives. Effortlessly filter through vast libraries of generated content to find the exact pieces that align with current marketing strategies.";

function Products() {
    const { data: products, isLoading: isLoadingProducts, isFetched: isFetchedProducts } = useFetchProducts();
    const [searchTerm, setSearchTerm] = useState("");

    const onSearchProducts = (searchText: string) => {
        setSearchTerm(searchText);
    }

    const filteredProducts = useMemo(() => {
        return products?.filter((product: Product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [products, searchTerm]);

    const hasReachedProductLimit = products?.length === 20;
    const [productToEdit, setProductToEdit] = useState<Product | null>();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onClickCreateNewProduct = () => {
        setIsDialogOpen(true);
        setProductToEdit(null);
    }

    const onClickEditProduct = (product: Product) => {
        setProductToEdit(product);
    }

    const onProductSuccess = () => {
        setProductToEdit(null);
        setIsDialogOpen(false)
        setSearchTerm("");
    }

    return (

        <div className="relative h-full py-7 px-10 flex flex-col align-center overflow-y-scroll">
            <ProductsHeader onSearchProducts={onSearchProducts} onClickCreateNewProduct={onClickCreateNewProduct} />

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                {hasReachedProductLimit ?
                    <ContactDialogContent /> :
                    <ProductDialogContent productToEdit={productToEdit} onProductSuccess={onProductSuccess} />
                }
            </Dialog >

            <Table className="mb-14">
                <ProductsTableHeader />
                <TableBody>
                    {!isLoadingProducts && filteredProducts?.map((product: Product) => (
                        <TableRow key={product.id}>
                            <TableCell className="w-1/4 py-2">
                                <Badge variant="default">{product.name}</Badge>
                            </TableCell>
                            <TableCell className="w-2/4 py-2">
                                <span className="w-full">
                                    {product.description}
                                </span>
                            </TableCell>
                            <TableCell className="w-full flex justify-end py-2">
                                <Button
                                    variant="link"
                                    onClick={() => {
                                        onClickEditProduct(product)
                                        setIsDialogOpen(true)
                                    }}>
                                    <PencilSquareIcon className="h-6 w-6 text-gray-400 hover:text-blue-600" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {isLoadingProducts && <SkeletonTable />}
                </TableBody>
            </Table>

            {isFetchedProducts && !isLoadingProducts && filteredProducts?.length === 0 && (
                <NotFound>
                    <Button onClick={onClickCreateNewProduct} variant="link" className="px-0">
                        Create a new product.
                    </Button>
                </NotFound>
            )}

            <div className="pb-20">
                <Info msg={PRODUCTS_INFO} learnMoreLink="/learn-more" />
            </div>
        </div>

    )
}

export default Products;