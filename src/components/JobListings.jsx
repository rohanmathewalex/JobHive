import { useState, useEffect } from 'react';
import JobList from './JobList';
import Spinner from './Spinner';

function JobListings({ isHome = false }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);

      try {
        let storedJobs = JSON.parse(localStorage.getItem("jobs"));

        if (!storedJobs) {
          // Fetch initial data from public/jobs.json
          const res = await fetch("/jobs.json");
          if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
          
          const data = await res.json();
          storedJobs = data.jobs;
          localStorage.setItem("jobs", JSON.stringify(storedJobs));
        }

        // If Home page, show only 3 recent jobs
        const displayedJobs = isHome ? storedJobs.slice(0, 3) : storedJobs;
        setJobs(displayedJobs);
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isHome]);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobList key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default JobListings;
