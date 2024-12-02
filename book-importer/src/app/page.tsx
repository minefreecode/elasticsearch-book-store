import FileUploader from "@/components/FileUploader";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-[#E7E7E7]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <FileUploader />
      </main>
    </div>
  );
}
