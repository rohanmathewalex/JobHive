import {
    BrowserRouter as Router,
    Routes,
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider
  } from "react-router-dom";
  import React from "react";
  import HomePage from "./pages/HomePage";
  import MainLayout from "./layouts/MainLayout";
  import JobsPage from "./pages/JobsPage";
  import NotFoundPage from "./pages/NotFoundPage";
  import JobPage from "./pages/JobPage";
  import AddJobPage from "./pages/AddJobPage";
  import EditJobPage from "./pages/EditJobPage";
  
  // ✅ Fix `jobLoader`
  const jobLoader = async ({ params }) => {
      let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  
      if (!jobs.length) {
          const res = await fetch("/jobs.json");
          if (!res.ok) throw new Error("Failed to load jobs.json");
          const data = await res.json();
          jobs = data.jobs;
          localStorage.setItem("jobs", JSON.stringify(jobs));
      }
  
      const job = jobs.find((j) => j.id === params.id);
      if (!job) throw new Response("Job not found", { status: 404 });
  
      return job;
  };
  
  // ✅ Use localStorage for managing jobs
  const addJob = async (newJob) => {
      const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
      localStorage.setItem("jobs", JSON.stringify([...jobs, newJob]));
  };
  
  const deleteJob = async (id) => {
      const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
      localStorage.setItem("jobs", JSON.stringify(jobs.filter((job) => job.id !== id)));
  };
  
  const updateJob = async (updatedJob) => {
      let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
      jobs = jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job));
      localStorage.setItem("jobs", JSON.stringify(jobs));
  };
  
  const router = createBrowserRouter(
      createRoutesFromElements(
          <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/edit-job/:id" element={<EditJobPage updateJobSubmit={updateJob} />} />
              <Route path="/jobs/:id" element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} />
              <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
          </Route>
      )
  );
  
  export default function App() {
      return <RouterProvider router={router} />;
  }
  