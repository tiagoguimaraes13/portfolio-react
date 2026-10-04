import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack, Link, useBreakpointValue } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto:hello@toimu.ee",
  },
  {
    icon: faLinkedin,
    url: "www.linkedin.com/in/tiago-guimaraes1996",
  },
];

const Header = () => {
  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Responsive: Change social icons layout on small screens
  const socialIconSize = useBreakpointValue({ base: "lg", md: "2x" });

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000} // Ensures header is always on top
      transition="transform 0.3s ease-in-out"
      backgroundColor="#18181b"
      width="100%"
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={{ base: 4, md: 16 }}
          py={4}
          justifyContent="space-between"
          alignItems="center"
          wrap="wrap"
        >
          {/* Social Icons */}
          <nav>
            <HStack spacing={{ base: 4, md: 6 }} align="center" wrap="wrap">
              {socials.map((social) => (
                <Link href={social.url} key={social.url} isExternal>
                  <FontAwesomeIcon
                    icon={social.icon}
                    size={socialIconSize}
                  />
                </Link>
              ))}
            </HStack>
          </nav>

          {/* Navigation Links */}
          <nav>
            <HStack
              spacing={{ base: 4, md: 8 }}
              display={{ base: "none", md: "flex" }}
              align="center"
            >
              <Link href="/#projects-section" onClick={() => handleClick("projects")}>
                Projects
              </Link>
              <Link href="/#contactme-section" onClick={() => handleClick("contactme")}>
                Contact Me
              </Link>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};

export default Header;
