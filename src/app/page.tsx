import { Messages } from "./messages";

export default async function Home() {
  return (
    <main>
      <div className="flex flex-col">
        {/* Header that looks like a messenger input. Shows CofiGPT as the title */}
        <div className="flex flex-row items-center justify-between bg-gray-100 p-2 sticky top-0">
          <div className="flex flex-row items-center text-center w-full">
            <h1 className="text-3xl text-center w-full">CofiGPT</h1>
          </div>
        </div>
        <Messages />
      </div>
    </main>
  );
}
