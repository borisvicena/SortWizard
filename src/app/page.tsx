import Chart from "@/components/Chart";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <div className="bg-base-100 min-h-screen">
        <Navbar />
        <main className="container w-full max-w-3xl rounded-box mx-auto px-4 py-36">
          <Chart />
        </main>
      </div>
    </>
  );
}
