'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"

import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFetchSubjects } from "@/api/queries/useFetchSubjects";
import ClickAwayListener from 'react-click-away-listener';

import { Skeleton } from "@/components/ui/skeleton"
import SearchBar from "@/components/SearchBar";

function Subjects() {
    const { data: subjects, isLoading } = useFetchSubjects();
    const [subjectToEdit, setSubjectToEdit] = useState<Subject | null>(null)
    const onClickEdit = (subject: Subject) => {
        setSubjectToEdit(subject)
    }

    const onSearchSubjects = (searchText: string) => {
        console.log("onSearchSubjects", searchText);
    }

    return (
        <div className="h-full py-7 px-10 flex flex-col align-center">
            <h1 className="text-xl font-semibold mb-4">Subjects</h1>

            <div className="w-full flex justify-between items-center gap-x-3 mb-6 border py-5 px-6 rounded-md">
                <SearchBar onSearch={onSearchSubjects} />
                <Button onClick={() => setSubjectToEdit({ id: "", name: "", description: "" })}>
                    <PlusIcon className="h-4 w-4 mr-1.5" />
                    Create Subject
                </Button>
            </div>

            <Sheet open={!!subjectToEdit}>
                <ClickAwayListener onClickAway={() => setSubjectToEdit(null)}>
                    <SheetContent onClickClose={() => setSubjectToEdit(null)}>
                        <SheetHeader>
                            <SheetTitle>Subject: {subjectToEdit?.name}</SheetTitle>
                            <SheetDescription>
                                {subjectToEdit?.description}
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </ClickAwayListener>
            </Sheet>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!isLoading && subjects?.map((subject: Subject) => (
                        <TableRow key={subject.id}>
                            <TableCell>{subject.name}</TableCell>
                            <TableCell>{subject.description}</TableCell>
                            <TableCell>
                                <PencilSquareIcon className="h-6 w-6 text-gray-400 cursor-pointer" onClick={() => onClickEdit(subject)} />
                            </TableCell>
                        </TableRow>
                    ))}

                    {isLoading && (
                        <>
                            {[...Array(3)].map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Skeleton className="w-full py-3" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="w-full py-3" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="w-full py-3" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default Subjects;