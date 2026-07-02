import PasswordCard from "@/components/PasswordCard";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-apple-bg dark:bg-black">
      <main className="flex-1 flex items-center justify-center p-6">
        <PasswordCard />
      </main>
    </div>
  );
}
