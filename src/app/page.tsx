import Chart from "@/components/Chart";
import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <div className="bg-base-100 min-h-screen">
        <Navbar />
        <Dashboard />
      </div>
    </>
  );
}
