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

function PersonaSelector({ 
    personas,
    mode = "voice",
    onSelectPersona,

}: { 
    personas: Persona[], 
    mode: "voice" | "target",
    onSelectPersona: (persona: Persona) => void
}) {
    return (
        <SelectGroup className="w-full p-1">
            {/* <SelectLabel className="px-0">
                Persona
            </SelectLabel> */}
            <div className="flex gap-x-2">
                <Select onValueChange={onSelectPersona}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Persona" />
                    </SelectTrigger>
                    <SelectContent>
                        {personas.map((persona) => (
                            <SelectItem key={persona.id} value={persona.id}>
                                {persona.name}
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
                                Select a {mode.toUpperCase()} Persona. This is the person you are creating marketing materials for.
                                The more information you provide, the better the marketing materials will be.
                                You can also emphasize different aspects of the persona by setting their emphasis.
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </SelectGroup>
    )
}

export default PersonaSelector