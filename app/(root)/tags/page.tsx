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

import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { useFetchTags } from "@/api/queries/useFetchTags";
import { Skeleton } from "@/components/ui/skeleton"
import SearchBar from "@/components/SearchBar";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useMemo, useState } from "react";

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


                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Thank You for Checking This Demo Out!</DialogTitle>
                        <DialogDescription>
                            If you want to get in touch to expand on this or work with me in some other way, enter your email and message, and Il get back to you ASAP. You can also learn more about me by visiting my LinkedIn, GitHub, etc. You can see the full source code for this demo at: [your GitHub repository link].
                        </DialogDescription>
                    </DialogHeader>
                    <form>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                rows={4}
                                required
                            ></textarea>
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </DialogContent>

                <Table className="mb-10">
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
                                <TableCell>{tag.name}</TableCell>
                                <TableCell>{tag.description}</TableCell>
                                <TableCell>
                                    <PencilSquareIcon
                                        className="h-6 w-6 text-gray-400 cursor-pointer"
                                    // onClick={() => onClickEdit(tag)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}

                        {isLoadingTags || isLoading && (
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

                {/* searchterm, no tags and not loading mean no results  means no results so show a nothing ofund*/}
                {!isLoadingTags && !isLoading && filteredTags?.length === 0 && (
                    <section className="flex justify-center">
                        <p className="my-20 max-w-3xl text-sm text-gray-500">
                            Nothing Found.{` `}
                            <Link href="/learn-more" className="text-blue-700 font-semibold hover:underline">
                                Create the tag "{searchTerm}"
                            </Link>.
                        </p>
                    </section>
                )}

                <section className="flex justify-center">
                    <div className="p-4 px-10 max-w-3xl border rounded-md flex justify-between items-center gap-x-3">
                        <InformationCircleIcon className="h-24 w-100 inline-block mr-2 text-blue-700" />
                        <p className="text-sm text-gray-500">
                            Tags allow users to categorize their content based on specific themes, target audiences, or campaign objectives, making it easier to manage and locate relevant materials quickly.
                            Effortlessly filter through vast libraries of generated content to find the exact pieces that align with current marketing strategies.{` `}
                            <Link href="/learn-more" className="text-blue-700">
                                Learn more
                            </Link>.
                        </p>
                    </div>
                </section>
            </div>
        </Dialog>
    )
}

export default Tags;