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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useFetchTags } from "@/api/queries/useFetchTags";
import Info from "@/components/Info";
import NotFound from "@/components/NotFound";
import SearchBar from "@/components/SearchBar";
import ContactForm from "@/components/ContactForm";
import SkeletonTable from "@/components/SkeletonTable";
import TagForm from "@/components/tags/TagForm";

function Tags() {
    const { data: tags, isLoading: isLoadingTags } = useFetchTags();
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const onSearchTags = (searchText: string) => {
        setIsLoading(true);
        setTimeout(() => {
            setSearchTerm(searchText);
            setIsLoading(false);
        }, 500);
    }

    const filteredTags = useMemo(() => {
        return tags?.filter(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [tags, searchTerm]);


    const hasReachedTagLimit = tags?.length === 10;


    const [tagToEdit, setTagToEdit] = useState<Tag>();
    const onClickEdit = (tag: Tag) => {
        setTagToEdit(tag);
    }

    return (
        <Dialog>
            <div className="relative h-full py-7 px-10 pb-0 flex flex-col align-center">
                <h1 className="text-xl font-semibold mb-4">Tags</h1>

                <div className="w-full flex justify-between items-center gap-x-3 mb-6 border py-5 px-6 rounded-md">
                    <SearchBar onSearch={onSearchTags} />
                    <DialogTrigger>
                        <Button >
                            <PlusIcon className="h-4 w-4 mr-1.5" />
                            Create Tag
                        </Button>
                    </DialogTrigger>
                </div>

                {/* Max Limit Reached */}
                {hasReachedTagLimit ? (
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Thank You for Checking This Demo Out!</DialogTitle>
                            <DialogDescription>
                                If you want to get in touch to expand on this or work with me in some other way, enter your email and message, and Il get back to you ASAP. You can also learn more about me by visiting my LinkedIn, GitHub, etc. You can see the full source code for this demo at: [your GitHub repository link].
                            </DialogDescription>
                        </DialogHeader>
                        <ContactForm />
                    </DialogContent>
                ) : (
                    // Create/Edit Tag
                    <DialogContent onCloseAutoFocus={() => setTagToEdit(undefined)}>
                        <DialogHeader>
                            <DialogTitle>{tagToEdit ? "Edit" : "Create"} Tag</DialogTitle>
                        </DialogHeader>
                        <TagForm tag={tagToEdit} />
                    </DialogContent>
                )}

                <Table className="mb-14">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!isLoadingTags && !isLoading && filteredTags?.map((tag: Tag) => (
                            <TableRow key={tag.id}>
                                <TableCell>
                                    <Badge variant="default">{tag.name}</Badge>
                                </TableCell>
                                <TableCell>{tag.description}</TableCell>
                                <TableCell>
                                    <DialogTrigger onClick={() => onClickEdit(tag)}>
                                        <PencilSquareIcon
                                            className="h-6 w-6 text-gray-400 cursor-pointer"
                                        // onClick={() => onClickEdit(tag)}
                                        />
                                    </DialogTrigger>
                                </TableCell>
                            </TableRow>
                        ))}

                        {isLoadingTags && (
                            <SkeletonTable />
                        )}
                    </TableBody>
                </Table>

                {/* searchterm, no tags and not loading mean no results  means no results so show a nothing ofund*/}
                {!isLoadingTags && !isLoading && filteredTags?.length === 0 && (
                    <NotFound>
                        <Link href="/learn-more" className="text-blue-700 font-semibold hover:underline">
                            Create the tag &quot;{searchTerm}&quot;
                        </Link>.
                    </NotFound>
                )}

                <Info
                    msg={"Tags allow users to categorize their content based on specific themes, target audiences, or campaign objectives. Effortlessly filter through vast libraries of generated content to find the exact pieces that align with current marketing strategies."}
                    learnMoreLink="/learn-more"
                />
            </div>
        </Dialog>
    )
}

export default Tags;