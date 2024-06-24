import { Card } from "./ui/card"

import { VideoCameraIcon } from "@heroicons/react/24/outline"

function VideoPreview() {
    return (
        <div className="flex flex-col max-w-xl mx-auto gap-y-10">
            <Card className="w-full border rounded-lg px-8 py-20 max-w-md mx-auto bg-white">
                <VideoCameraIcon className="w-12 h-12 mx-auto text-gray-400" />
            </Card >
            <p>
                For instance, if the context includes details about an educational poster, the text preview might showcase titles, descriptions, and other pertinent information that enhances the understanding and appeal of the poster. Similarly, for other types of content, the preview will adapt to present information in a coherent and engaging manner.
            </p>
        </div>
    )
}

export default VideoPreview