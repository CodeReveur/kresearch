import Link from "next/link";

const researchTopics = [
  "Pest surveillance and management",
  "Sustainable farming practices",
  "Crop diversification",
  "Food systems",
  "Biofortification",
  "HIV/AIDS and other sexually transmitted infections",
  "Reproductive health and family planning",
  "Infectious diseases (e.g., malaria, Ebola, Marburg virus)",
  "Occupational safety and health in agriculture",
  "Advanced surgical techniques",
  "Higher education development",
  "Access to education in rural areas",
  "Educational technology integration",
  "Curriculum development",
  "Electronic case management systems",
  "Digital transformation in public services",
  "Artificial intelligence applications",
  "Post-genocide reconciliation and justice",
  "Social equity in healthcare",
  "Gender studies",
  "Community development",
  "Climate change adaptation",
  "Biodiversity conservation",
  "Sustainable urban planning",
  "Water resource management",
  "Trade and market dynamics",
  "Infrastructure development",
  "Social protection programs",
  "Energy sector growth",
  "Policy strengthening in labor sectors",
  "Public administration reforms",
  "Legal system effectiveness"
];
const filteredTopics = researchTopics.filter((topic) =>
  topic.toLowerCase().includes("health") // Change this condition based on your need
);
const sortedTopics = researchTopics.sort((a, b) => a.localeCompare(b));
const SimilarTopics = () => {
  return (
    <div className="div bg-white py-2 px-3 space-y-1 flex flex-col max-h-[65vh] overflow-hidden overflow-y-visible">
      {sortedTopics.map((topic, i) => (
         <a key={i} href={`/w-page/result?search=${topic}`} className="text-sm py-2 px-3 bg-slate-50 rounded hover:bg-slate-100 text-gray-600 ">{topic}</a>
      ))}
    </div>
  );
}
export default SimilarTopics;