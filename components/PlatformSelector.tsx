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

import { Checkbox } from "./ui/checkbox";

function PlatformSelector({
    platforms,
    onSelectPlatform,
    selectedPlatform
}: {
    platforms: Platform[],
    onSelectPlatform: (platform: Platform) => void,
    selectedPlatform: Platform | null
}) {
    console.log("monke selectedPlatform", selectedPlatform)
    return (
        <div className="w-full">
            <SelectGroup className="w-full p-1">
                {/* <SelectLabel className="px-0">
                Platform
            </SelectLabel> */}
                <div className="flex gap-x-2">
                    <Select onValueChange={onSelectPlatform}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Platform" />
                        </SelectTrigger>
                        <SelectContent>
                            {platforms.map((platform) => (
                                <SelectItem key={platform.id} value={platform}>
                                    {platform.name}
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
                                    Select a Platform. This is the platform you are creating marketing materials for.
                                    The more information you provide, the better the marketing materials will be.
                                    You can also emphasize different aspects of the platform by setting their emphasis.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </SelectGroup>

            {selectedPlatform && selectedPlatform.about && (
                <div>
                    <div className="p-2 mt-2 bg-gray-100 rounded-md">
                        <p className="text-sm text-black">
                            {selectedPlatform.about}
                        </p>
                    </div>

                    {/* if selectedPlatform is twitter, render additonal input: Image as a checkbox*/}
                    {selectedPlatform.name === "Twitter" && (
                        <div>
                            <div className="mt-10">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="image"
                                        onClick={() => console.log("monke")}
                                    />
                                    <label
                                        htmlFor="image"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Add Image
                                    </label>
                                </div>

                                {/* tags */}
                            </div>

                            <div className="mt-10">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="hashtags"
                                        onClick={() => console.log("monke")}
                                    />
                                    <label
                                        htmlFor="hashtags"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Add Hashtags
                                    </label>
                                </div>

                                {/* tags */}
                            </div>

                        </div>

                    )}

                </div>
            )}
        </div>
    )
}

export default PlatformSelector