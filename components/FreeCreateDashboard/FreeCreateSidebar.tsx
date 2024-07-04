import FreeCreateForm from "./FreeCreateForm";

function FreeCreateSidebar() {
  return (
    <div className="w-[540px] h-screen border-r py-7 px-10 overflow-y-scroll">
      <h1 className="text-xl font-semibold mb-4">Free Create</h1>
      <div className="flex flex-col h-screen gap-y-10">
        <FreeCreateForm />
      </div>
    </div>
  )
}

export default FreeCreateSidebar