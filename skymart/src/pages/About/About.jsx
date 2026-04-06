import AboutStats from "../../components/AboutStat";
import TeamSection from "../../components/TeamSection";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AboutStats />
      <TeamSection />
    </div>
  );
};

export default About;
