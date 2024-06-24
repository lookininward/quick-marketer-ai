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

function SubjectSelector({
    subjects,
    onSelectSubject,
}: {
    subjects: Subject[],
    onSelectSubject: (subject: Subject) => void
}) {
    return (
        <SelectGroup className="w-full p-1">
            {/* <SelectLabel className="px-0">
                Subject
            </SelectLabel> */}
            <div className="flex gap-x-2">
                <Select onValueChange={onSelectSubject}>
                    <SelectTrigger className="w-full" >
                        <SelectValue placeholder="Select a Subject" />
                    </SelectTrigger>
                    <SelectContent>
                        {subjects.map((subject) => (
                            <SelectItem key={subject.id} value={subject}>
                                {subject.name}
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
                                Select a Subject. The details you provide about subjects will be used to generate marketing materials.
                                The more information you provide, the better the marketing materials will be.
                                You can also emphasize different aspects of the subject by setting their emphasis.
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </SelectGroup>
    )
}

export default SubjectSelector