import { Card } from "./ui/card"

function TextPreview() {
    return (
        <Card className="flex flex-col border rounded-lg p-8 max-w-xl mx-auto my-4 bg-white gap-y-3">
            <p>
                The text output generates  dynamic content based on various contextual inputs such as the provided description, subject, persona, and other attributes. The generated content aims to deliver personalized and contextually relevant information, ensuring it aligns with the intended message and audience.
            </p>
            <p>
                For instance, if the context includes details about an educational poster, the text preview might showcase titles, descriptions, and other pertinent information that enhances the understanding and appeal of the poster. Similarly, for other types of content, the preview will adapt to present information in a coherent and engaging manner.
            </p>
        </Card >
    )
}

export default TextPreview