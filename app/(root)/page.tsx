import LibraryContainer from "@/components/library/LibraryContainer";

const CONTENT = "Are you looking to effortlessly create and manage high-quality AI-generated marketing content for your business? Look no further than Quick-Market-AI! Our innovative SaaS product is designed to help businesses like yours streamline the process of generating engaging content across various mediums, from text to video and platform-specific formats.\n\nWith Quick-Market-AI, you can say goodbye to time-consuming content creation and hello to efficient, effective marketing campaigns. Our AI system leverages the products you input, along with custom personas you create in the user-friendly dashboard, to tailor content specifically to different target audiences. This personalized approach ensures that your messages resonate with potential customers and drive engagement.\n\nDon't let content creation bog you down – empower your business with Quick-Market-AI and unlock the full potential of AI-generated marketing content. Join the future of marketing today!"

export default function Home() {
  const paragraphs = CONTENT.split('\n\n');
  return (
    <main className="py-7 px-10 flex flex-col align-center overflow-y-scroll h-full">
      <h1 className="text-xl font-semibold mb-6">Projects</h1>
      <LibraryContainer />
      <div className="flex flex-col justify-center items-center mt-20 pb-20">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="py-3 max-w-3xl">
            {paragraph}
          </p>
        ))}
      </div>
    </main>
  );
}
