import Footer from '@/app/pages/footer';
import React from 'react';

// Define a reusable section component with more compact styling
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <section className="my-10">
      <h2 className="text-2xl font-semibold text-teal-600 mb-4">{title}</h2>
      <div className="text-base text-gray-600">{children}</div>
    </section>
  );
};

// Define the team card component
const TeamCard = ({ name, role, image }: { name: string; role: string; image: string }) => {
  return (
    <div className="flex flex-col items-center bg-white shadow-lg rounded-xl p-4 text-center">
      <img src={image} alt={name} className="w-32 h-32 object-cover rounded-full mb-4" />
      <h4 className="font-semibold text-teal-600">{name}</h4>
      <p className="text-gray-500">{role}</p>
    </div>
  );
};

const AboutUs: React.FC = () => {
  return (
    <div className="sm:max-w-[80%] w-full mx-auto p-6 mt-[120px]">
      {/* Hero Section */}
      <div className="bg-teal-600 text-white text-center py-14 px-6 mb-10 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Welcome to Kamero Research Base</h1>
        <p className="text-lg opacity-80">
          Leading research to create a sustainable future through collaboration, innovation, and global impact.
        </p>
      </div>

      {/* Mission Section */}
      <Section title="Our Mission">
        <p>
          At Kamero Research Base, we drive research that positively impacts the environment, society, and
          technology. Our team is committed to collaborating globally, addressing humanity's most pressing
          challenges with innovative solutions.
        </p>
      </Section>

      {/* Vision Section */}
      <Section title="Our Vision">
        <p>
          Our vision is to be a global leader in scientific research and innovation, shaping a sustainable
          and brighter future for everyone.
        </p>
      </Section>

      {/* Core Values Section */}
      <Section title="Core Values">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <strong>Innovation</strong>: Pushing boundaries with fresh ideas and cutting-edge technology.
          </div>
          <div>
            <strong>Collaboration</strong>: Partnering with experts to achieve greater outcomes.
          </div>
          <div>
            <strong>Integrity</strong>: Committing to the highest ethical standards in all of our work.
          </div>
          <div>
            <strong>Sustainability</strong>: Ensuring long-term well-being for both people and the planet.
          </div>
        </div>
      </Section>

      {/* Research Focus Areas Section */}
      <Section title="Research Focus Areas">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-teal-600">Environmental Science</h4>
            <p>Studying ecosystems and sustainability practices to address climate change.</p>
          </div>
          <div>
            <h4 className="font-semibold text-teal-600">Health and Medicine</h4>
            <p>Innovating medical solutions to improve public health on a global scale.</p>
          </div>
          <div>
            <h4 className="font-semibold text-teal-600">Technology</h4>
            <p>Harnessing AI, machine learning, and emerging technologies to advance industries.</p>
          </div>
          <div>
            <h4 className="font-semibold text-teal-600">Social Science</h4>
            <p>Researching societal issues to foster community development and well-being.</p>
          </div>
          <div>
            <p><i>However, the major focus is all recognized research categories by Rwanda Academic Regulators.</i></p>
          </div>
        </div>
      </Section>

      {/* Team Section with Cards */}
      <Section title="Our Team">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          <TeamCard 
            name="Olivier Turikumwe" 
            role="Founder & CEO" 
            image="/logo.svg" 
          />
          <TeamCard 
            name="Joseph Maranatha" 
            role="Lead Technologist" 
            image="/logo.svg" 
          />
          <TeamCard 
            name="Dorcas Nyiramahoro" 
            role="Chief Sales Manager" 
            image="/logo.svg" 
          />
        </div>
      </Section>

      {/* What Sets Us Apart Section */}
      <Section title="What Sets Us Apart">
        <ul className="list-disc pl-6">
          <li><strong>Global Impact:</strong> Our research and findings are recognized globally, influencing industries and communities worldwide.</li>
          <li><strong>Cutting-Edge Facilities:</strong> Equipped with state-of-the-art research technologies for maximum efficiency and innovation.</li>
          <li><strong>Sustainability Commitment:</strong> Leading with eco-friendly practices in all aspects of our research and operations.</li>
        </ul>
      </Section>

      {/* Join Us Section */}
      <Section title="Join Us">
        <p>
          We believe in the power of collaboration. If you are a researcher, academic, or organization looking
          to partner with us, get in touch! Together, we can build solutions for a sustainable future.
        </p>
      </Section>

      {/* Footer */}
      <footer className="bg-teal-500 text-white py-6 text-center mt-16 rounded-t-lg shadow-lg">
        <Footer />
      </footer>
    </div>
  );
};

export default AboutUs;
