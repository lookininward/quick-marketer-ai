import React from 'react'
import { PlusIcon } from "@heroicons/react/24/outline";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";

function PersonasHeader({
    onSearchPersonas,
    onClickCreateNewPersona
}: {
    onSearchPersonas: (searchText: string) => void,
    onClickCreateNewPersona: () => void
}) {
    return (
        <>
            <h1 className="text-xl font-semibold mb-4">Persona</h1>
            <div className="w-full flex justify-between items-center gap-x-3 mb-6 border py-5 px-6 rounded-md">
                <SearchBar onSearch={onSearchPersonas} />
                <Button onClick={onClickCreateNewPersona}>
                    <PlusIcon className="h-4 w-4 mr-1.5" />
                    Create Persona
                </Button>
            </div>
        </>
    )
}

export default PersonasHeader