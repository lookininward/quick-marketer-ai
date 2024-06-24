import Image from "next/image"

function InstagramPreview({
    imageUrl,
    title,
    description
}: {
    imageUrl: string,
    title: string,
    description: string
}) {
    return (
        <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
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

export default InstagramPreview