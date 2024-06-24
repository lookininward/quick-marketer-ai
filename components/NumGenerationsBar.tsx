import { useFreeCreateContext } from "@/context/FreeCreateContext";
import { MAX_GENERATIONS } from "@/mock";

function NumGenerationsBar() {
    const { isGenerating, selectedPlatform, numGenerations } = useFreeCreateContext();
    return (
        < div className="flex items-center justify-center gap-x-2 p-4 border-b w-full" >
            <div className="w-full h-4 bg-gray-200 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(numGenerations / MAX_GENERATIONS) * 100}%` }} />
            </div>
            <span className="text-gray-500 text-sm font-semibold">{numGenerations}/{MAX_GENERATIONS}</span>
        </div >
    )
}

export default NumGenerationsBar