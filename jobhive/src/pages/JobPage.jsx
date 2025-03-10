import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const JobPage = ({ deleteJob }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
        const foundJob = jobs.find((j) => j.id === id);
        if (!foundJob) {
            toast.error("Job not found!");
            navigate("/jobs");
        } else {
            setJob(foundJob);
        }
    }, [id, navigate]);

    const onDeleteClick = () => {
        const confirm = window.confirm("Are you sure you want to delete this listing?");
        if (!confirm) return;

        let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
        jobs = jobs.filter((job) => job.id !== id);
        localStorage.setItem("jobs", JSON.stringify(jobs));

        toast.success("Job deleted successfully");
        navigate("/jobs");
    };

    if (!job) return <p>Loading...</p>;

    return (
        <section>
            <h1>{job.title}</h1>
            <p>{job.location}</p>
            <p>{job.salary}</p>
            <button onClick={onDeleteClick}>Delete Job</button>
        </section>
    );
};

// ✅ Correct export for `jobLoader`
export const jobLoader = async ({ params }) => {
    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    if (!jobs.length) {
        const res = await fetch("/jobs.json");
        if (!res.ok) throw new Error(`Failed to load jobs.json`);
        const data = await res.json();
        jobs = data.jobs;
        localStorage.setItem("jobs", JSON.stringify(jobs));
    }

    const job = jobs.find((j) => j.id === params.id);
    if (!job) throw new Response("Job not found", { status: 404 });

    return job;
};

export default JobPage;
