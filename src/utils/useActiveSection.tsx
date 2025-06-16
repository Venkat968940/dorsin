import { useState, useEffect } from "react";

const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const sections = document.querySelectorAll("div[id]"); // All sections with an 'id' attribute
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Ensure that we update the active section based on visibility in viewport
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id); // Set active section based on the 'id' of the section
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
        rootMargin: "0px 0px -100px 0px", // Add a bottom margin to trigger when nearing the section
      }
    );

    // Start observing each section
    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect(); // Cleanup observer on component unmount
    };
  }, []);

  return { activeSection, setActiveSection };
};

export default useActiveSection;
