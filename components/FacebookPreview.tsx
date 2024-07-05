import Image from "next/image"

function FacebookPreview({
    imageUrl = "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title = "Educational poster",
    description = "This is a poster that I made for my students to help them remember the different types of angles."
}: {
    imageUrl?: string,
    title?: string,
    description?: string
}) {
    return (
        <div className="max-w-sm bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <Image
                        className="h-full w-full object-cover md:w-48"
                        src={imageUrl}
                        alt={title}
                        width={1920}
                        height={1080}
                    />
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">@mentes.brillantesig</div>
                    <h1 className="block mt-1 text-lg leading-tight font-medium text-black">{title}</h1>
                    <p className="mt-2 text-gray-500">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default FacebookPreview