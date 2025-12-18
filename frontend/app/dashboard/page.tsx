"use client";

import axios from "axios";
import { X, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface StatCardProps {
  title: string;
  value: number;
}

const StatCard = ({ title, value }: StatCardProps) => (
  <div className="bg-white rounded-xl shadow-lg p-6 w-64 text-center">
    <h2 className="text-gray-500 font-semibold text-sm">{title}</h2>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default function Dashboard() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [queues, setQueues] = useState(0);
  const [projects, setProjects] = useState(0);
  const [jobs, setJobs] = useState(0);
  const [jobsCompleted, setJobsCompleted] = useState(0);

  useEffect(() => {

     let isMounted = true;
    async function fetchData() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/get-data`,
          { withCredentials: true }
        );
        console.log(response);

        if (response.status === 200) {

            const { 
totalProjects
, totalQueues
, 
totalJobs
, totalJobsCompleted } = response.data.data; 
          setQueues(totalQueues);
          setProjects(totalProjects);
          setJobs(totalJobs);
          setJobsCompleted(totalJobsCompleted);
        } else {
          console.error("Error fetching dashboard data");
        }
      } catch (er) {
        console.error("Error while fetching dashboard data:", er);
      }
      finally {
        // Schedule next request after 3 seconds
        if (isMounted) setTimeout(fetchData, 3000);
      }
    }

    fetchData();


     return () => {
      isMounted = false; // cancel on unmount
    };
  }, []);

  

  const stats = [
    { title: "Total Queues", value: queues },
    { title: "Total Projects", value: projects },
    { title: "Total Jobs", value: jobs },
    { title: "Total Jobs Completed", value: jobsCompleted },
  ];

  return (
    <div className="flex flex-col justify-between w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#e8e5e5] via-[#a3a3a3] to-[#e5e5e5]">
      
      {/* Navbar */}
      <div className="flex justify-between items-center mt-2 z-50 w-full bg-black text-white rounded-md px-6 py-4 font-bold shadow-xl">
        <div className="px-4 py-2 rounded-lg font-roboto text-lg border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all duration-300 shadow-sm">
          Dashboard
        </div>

        <div className="hidden sm:flex items-center gap-6 font-roboto text-lg">
          <button
            className="px-5 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all duration-300 shadow-sm hover:shadow-md"
            onClick={() => router.push("/home")}
          >
            Home
          </button>
          <button
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 focus:ring-2 focus:ring-blue-400 transition-all duration-300 shadow-sm hover:shadow-lg"
            onClick={() => router.push("/")}
          >
            Logout
          </button>
        </div>

        <div className="sm:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden flex flex-col gap-2 mt-2 bg-black rounded-lg p-2 text-center">
          <button
            className="px-3 py-2 text-white border border-white/20 rounded-lg"
            onClick={() => router.push("/home")}
          >
            Home
          </button>
          <button
            className="px-3 py-2 text-white bg-blue-600 rounded-lg"
            onClick={() => router.push("/")}
          >
            Logout
          </button>
        </div>
      )}

      {/* Stats Cards */}
     <div className="flex justify-center mt-10">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {stats.map((stat) => (
      <StatCard key={stat.title} title={stat.title} value={stat.value} />
    ))}
  </div>
</div>
    </div>
  );
}
