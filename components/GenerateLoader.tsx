import { Skeleton } from "@/components/ui/skeleton"

function GenerateLoader() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[325px] w-[650px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[550px]" />
                <Skeleton className="h-4 w-[300px]" />
            </div>
        </div>
    )
}

export default GenerateLoader