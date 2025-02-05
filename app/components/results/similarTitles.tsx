import Link from "next/link";

const researchTitles = [
  "The Impact of Climate Change on Agriculture in Rwanda",
  "Advancing AI-Powered Healthcare Solutions in Rwanda",
  "Post-Genocide Reconciliation and Social Healing",
  "The Role of Digital Transformation in Rwanda’s Public Sector",
  "Sustainable Urban Planning for Kigali’s Rapid Growth",
  "The Effectiveness of Rwanda’s Universal Health Coverage Program",
  "Artificial Intelligence in Precision Farming",
  "Women Empowerment Through Entrepreneurship in Rwanda",
  "Assessing the Impact of E-Government Services on Public Administration",
  "Exploring Renewable Energy Solutions for Rural Communities",
  "Cybersecurity Challenges in Rwanda’s Banking Sector",
  "The Role of Education Technology in Bridging the Digital Divide",
  "The Future of Smart Cities in East Africa: A Case Study of Kigali",
  "Food Security and Sustainable Agricultural Practices in Rwanda",
  "Blockchain Technology for Transparent Land Registry Systems"
];

const filteredTitles = researchTitles.filter((Title) =>
  Title.toLowerCase().includes("health") // Change this condition based on your need
);
const sortedTitles = researchTitles.sort((a, b) => a.localeCompare(b));

const SimilarTitles = () => {
  return (
    <div className="div bg-white py-2 px-3 space-y-1 flex flex-col max-h-[65vh] overflow-hidden overflow-y-visible">
      {sortedTitles.map((title, i) => (
         <a key={i} href={`/w-page/result?search=${title}`} className="text-sm py-2 px-3 bg-slate-50 rounded hover:bg-slate-100 text-gray-600 ">{title}</a>
      ))}
    </div>
  );
}
export default SimilarTitles;