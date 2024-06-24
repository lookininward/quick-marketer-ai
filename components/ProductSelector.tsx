import {
    SelectLabel,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
} from "@/components/ui/select"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { InformationCircleIcon } from '@heroicons/react/24/outline';

function ProductSelector({
    products,
    onSelectProduct,
}: {
    products: Product[],
    onSelectProduct: (product: Product) => void
}) {
    return (
        <SelectGroup className="w-full p-1">
            {/* <SelectLabel className="px-0">
                Product
            </SelectLabel> */}
            <div className="flex gap-x-2">
                <Select onValueChange={onSelectProduct}>
                    <SelectTrigger className="w-full" >
                        <SelectValue placeholder="Select a Product" />
                    </SelectTrigger>
                    <SelectContent>
                        {products.map((product) => (
                            <SelectItem key={product.id} value={product}>
                                {product.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <InformationCircleIcon className="w-5 h-5 text-gray-900" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="w-[200px]">
                                Select a Product. The details you provide about products will be used to generate marketing materials.
                                The more information you provide, the better the marketing materials will be.
                                You can also emphasize different aspects of the product by setting their emphasis.
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </SelectGroup>
    )
}

export default ProductSelector