import { MainRecruitCard } from "./MainRecruitCard";

// Example data for 5 different recruitment cards
const dummyData = [
  {
    title: "Frontend Developer",
    company: "Tech Corp",
    location: "San Francisco",
  },
  { title: "Backend Developer", company: "Innovatech", location: "New York" },
  {
    title: "Data Scientist",
    company: "Data Analytics Ltd.",
    location: "Chicago",
  },
  {
    title: "Project Manager",
    company: "Project Solutions",
    location: "Los Angeles",
  },
  { title: "UI/UX Designer", company: "DesignStudio", location: "Seattle" },
];

const MainRecruitList = () => {
  return (
    <div className="gap-4 center">
      {dummyData.map((job, index) => (
        <MainRecruitCard
          key={index}
          title={job.title}
          company={job.company}
          location={job.location}
        />
      ))}
    </div>
  );
};

export default MainRecruitList;
