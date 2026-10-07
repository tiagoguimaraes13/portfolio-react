import React from "react";
import FullScreenSection from "./FullScreenSection";
import { Box, Heading, Tabs, TabList, Tab, TabPanels, TabPanel, useBreakpointValue } from "@chakra-ui/react";
import Card from "./Card";

const projects = [
  {
    title: "TG Web Design",
    description: "A React-based platform for TG Web Design, featuring a portfolio, services, and contact form. Showcasing responsive design and modern web development.",
    getImageSrc: () => require("../assets/img8.png"),
    type: "React Projects",
    websiteUrl: "https://t-gwebdesign.vercel.app",
  },
  {
    title: "OKOA Gallery v2.0",
    description: "A React-powered online art gallery with dynamic galleries, responsive design, and seamless navigation, showcasing modern web development skills.",
    getImageSrc: () => require("../assets/img1.png"),
    type: "React Projects",
    websiteUrl: "https://oko-areact.vercel.app",
  },
  {
    title: "Little Lemon Restaurant",
    description: "A React-based platform for Little Lemon restaurant, featuring restaurant info, an online menu, and table booking. Showcasing responsive design and modern web development.",
    getImageSrc: () => require("../assets/img2.png"),
    type: "React Projects",
    websiteUrl: "https://littlelemontallinn.netlify.app",
  },
  {
    title: "Portfolio Website HTML v1.0",
    description: "A portfolio website created in HTML, CSS and JavaScript.",
    getImageSrc: () => require("../assets/img5.png"),
    type: "HTML Projects",
    websiteUrl: "https://htmlportfolio-tiago.netlify.app",
  },
  {
    title: "Cursor Neon",
    description: "A editable cursor neon, with colours and shapes.",
    getImageSrc: () => require("../assets/img4.png"),
    type: "Other Projects",
    websiteUrl: "https://cursorneon.netlify.app//",
  },
  {
    title: "BCocoon Kids",
    description: "A React-based platform for a online baby clothes shop based in Portugal.",
    getImageSrc: () => require("../assets/img3.png"),
    type: "React Projects",
    websiteUrl: "https://b-cocoon.vercel.app/",
  },
  {
    title: "MiguelAM Transportes",
    description: "A React-based platform to a small logistics company.",
    getImageSrc: () => require("../assets/img6.png"),
    type: "React Projects",
    websiteUrl: "https://miguel-am.vercel.app/",
  },
  {
    title: "CardosoSarl Landscapes",
    description: "A React-based platform to a landscaping company.",
    getImageSrc: () => require("../assets/img7.png"),
    type: "React Projects",
    websiteUrl: "https://cardoso-sarl.vercel.app/",
  },
];

const ProjectsSection = () => {
  const projectTypes = ["React Projects", "HTML Projects", "Other Projects"];

  // Responsive column count for the grid
  const gridTemplateColumns = useBreakpointValue({
    base: "1fr",        // 1 column on mobile
    sm: "1fr 1fr",      // 2 columns for small devices
    md: "1fr 1fr",      // 2 columns for medium devices (laptops)
    lg: "1fr 1fr",      // 2 columns for large screens
  });

  return (
    <FullScreenSection
      backgroundColor="black"
      isDarkBackground
      p={{ base: 4, md: 8 }}  // Padding adjusted for smaller screens
      alignItems="center"
      spacing={8}
    >
      <Heading as="h1" id="projects-section" fontSize={{ base: "2xl", md: "3xl" }} textAlign="center" color="white">
        Featured Projects
      </Heading>

      <Tabs variant="soft-rounded" colorScheme="blue" align="center" width="100%" isLazy>
        <TabList justifyContent="center">
          {projectTypes.map((type) => (
            <Tab key={type} fontSize={{ base: "sm", md: "lg" }} _selected={{ color: "white", bg: "blue.400" }}>
              {type}
            </Tab>
          ))}
        </TabList>
        
        <TabPanels>
          {projectTypes.map((type) => (
            <TabPanel key={type}>
              <Box
                display="grid"
                gridTemplateColumns={gridTemplateColumns}  // Ensures 2 columns on laptops and larger
                gridGap={8}  // Space between grid items
                width="100%"  // Full width of the container
              >
                {projects
                  .filter((project) => project.type === type)
                  .map((project) => (
                    <Card
                      key={project.title}
                      title={project.title}
                      description={project.description}
                      imageSrc={project.getImageSrc()}
                      websiteUrl={project.websiteUrl}
                    />
                  ))}
              </Box>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </FullScreenSection>
  );
};

export default ProjectsSection;
