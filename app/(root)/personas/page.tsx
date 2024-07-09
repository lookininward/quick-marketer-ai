'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Dialog } from "@/components/ui/dialog"
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Info from "@/components/Info";
import NotFound from "@/components/NotFound";
import SkeletonTable from "@/components/SkeletonTable";
import ContactDialogContent from "@/components/ContactDialogContent";
import PersonasHeader from "@/components/personas/PersonasHeader";
import { useFetchPersonas } from "@/query-api/queries/useFetchPersonas";
import PersonasTableHeader from "@/components/personas/PersonasTableHeader";
import PersonaDialogContent from "@/components/personas/PersonaDialogContent";
import Image from "next/image";

const PERSONAS_INFO = "Add personas to generate persona-specific content. Use personas to categorize content based on specific themes, target audiences, or campaign objectives. Effortlessly filter through vast libraries of generated content to find the exact pieces that align with current marketing strategies.";

function Personas() {
    const { data: personas, isLoading: isLoadingPersonas, isFetched: isFetchedPersonas } = useFetchPersonas();
    const [searchTerm, setSearchTerm] = useState("");

    const onSearchPersonas = (searchText: string) => {
        setSearchTerm(searchText);
    }

    const filteredPersonas = useMemo(() => {
        return personas?.filter((persona: Persona) => persona.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [personas, searchTerm]);

    const hasReachedPersonaLimit = personas?.length === 20;
    const [personaToEdit, setPersonaToEdit] = useState<Persona | null>();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onClickCreateNewPersona = () => {
        setIsDialogOpen(true);
        setPersonaToEdit(null);
    }

    const onClickEditPersona = (persona: Persona) => {
        setPersonaToEdit(persona);
    }

    const onPersonaSuccess = () => {
        setPersonaToEdit(null);
        setIsDialogOpen(false)
        setSearchTerm("");
    }

    return (

        <div className="relative h-full py-7 px-10 flex flex-col align-center overflow-y-scroll">
            <PersonasHeader onSearchPersonas={onSearchPersonas} onClickCreateNewPersona={onClickCreateNewPersona} />

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                {hasReachedPersonaLimit ?
                    <ContactDialogContent /> :
                    <PersonaDialogContent personaToEdit={personaToEdit} onPersonaSuccess={onPersonaSuccess} />
                }
            </Dialog >

            <Table className="mb-14">
                <PersonasTableHeader />
                <TableBody>
                    {!isLoadingPersonas && filteredPersonas?.map((persona: Persona) => (
                        <TableRow key={persona.id}>
                            <TableCell className="py-2">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                    {persona.thumbnail ? <Image src={persona.thumbnail} alt={persona.name} className="w-10 h-10 rounded-full" /> : persona.name[0]}
                                </div>
                            </TableCell>
                            <TableCell className="w-1/4 py-2">
                                <span className="w-full">
                                    {persona.name}
                                </span>
                            </TableCell>
                            <TableCell className="w-2/4 py-2">
                                <span className="w-full">
                                    {persona.description}
                                </span>
                            </TableCell>
                            <TableCell className="w-full flex justify-end py-2">
                                <Button
                                    variant="link"
                                    onClick={() => {
                                        onClickEditPersona(persona)
                                        setIsDialogOpen(true)
                                    }}>
                                    <PencilSquareIcon className="h-6 w-6 text-gray-400 hover:text-blue-600" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {isLoadingPersonas && <SkeletonTable />}
                </TableBody>
            </Table>

            {isFetchedPersonas && !isLoadingPersonas && filteredPersonas?.length === 0 && (
                <NotFound>
                    <Button onClick={onClickCreateNewPersona} variant="link" className="px-0">
                        Create a new persona.
                    </Button>
                </NotFound>
            )}

            <div className="pb-20">
                <Info msg={PERSONAS_INFO} learnMoreLink="/learn-more" />
            </div>
        </div>

    )
}

export default Personas;