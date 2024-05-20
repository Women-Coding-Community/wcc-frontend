// components/Navbar.tsx
"use client";

import { Box, AppBar, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export default function Navbar() {
  const [anchorElMentorship, setAnchorElMentorship] =
    React.useState<null | HTMLElement>(null);
  const [anchorElProgrammes, setAnchorElProgrammes] =
    React.useState<null | HTMLElement>(null);
  const [anchorElAboutUs, setAnchorElAboutUs] =
    React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (
    setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>,
  ) => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="default"
        sx={{ height: "80px", display: "flex", justifyContent: "center" }}
      >
        <Container>
          <Toolbar>
            <Image src="/logo_white.png" alt="Logo" width={60} height={60} />
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "right" }}>
              <Link href="/" passHref>
                <Button sx={{ color: "primary.dark" }}>
                  <Typography variant="body2">Home</Typography>
                </Button>
              </Link>
              <Button
                color="inherit"
                onClick={(event) =>
                  handleMenuOpen(event, setAnchorElMentorship)
                }
                sx={{ color: "primary.dark" }}
              >
                <Typography variant="body2">Mentorship</Typography>
              </Button>
              <Menu
                sx={{ color: "primary.dark", fontSize: "16px" }}
                anchorEl={anchorElMentorship}
                open={Boolean(anchorElMentorship)}
                onClose={() => handleMenuClose(setAnchorElMentorship)}
              >
                <MenuItem
                  onClick={() => handleMenuClose(setAnchorElMentorship)}
                >
                  <Link href="/mentorship" passHref>
                    <Typography
                      variant="body2"
                      sx={{ color: "primary.dark", textDecoration: "none" }}
                    >
                      Overview
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={() => handleMenuClose(setAnchorElMentorship)}
                  sx={{ color: "primary.dark", fontSize: "16px" }}
                >
                  <Link href="/mentors" passHref>
                    Mentors
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={() => handleMenuClose(setAnchorElMentorship)}
                  sx={{ color: "primary.dark", fontSize: "16px" }}
                >
                  <Link href="/mentorship" passHref>
                    Resources
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={() => handleMenuClose(setAnchorElMentorship)}
                  sx={{ color: "primary.dark", fontSize: "16px" }}
                >
                  <Link href="/mentorship" passHref>
                    Code of Conduct
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={() => handleMenuClose(setAnchorElMentorship)}
                  sx={{ color: "primary.dark", fontSize: "16px" }}
                >
                  <Link href="/mentorship" passHref>
                    FAQ
                  </Link>
                </MenuItem>
              </Menu>
              <Button
                color="inherit"
                onClick={(event) =>
                  handleMenuOpen(event, setAnchorElProgrammes)
                }
              >
                Programmes
              </Button>
              <Menu
                anchorEl={anchorElProgrammes}
                open={Boolean(anchorElProgrammes)}
                onClose={() => handleMenuClose(setAnchorElProgrammes)}
              >
                <MenuItem
                  onClick={() => handleMenuClose(setAnchorElProgrammes)}
                >
                  <Link href="/book-club">
                    <Typography variant="body1">Book Club</Typography>
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={() => handleMenuClose(setAnchorElProgrammes)}
                >
                  <Link href="/interview-preparation">
                    <Typography variant="body1">
                      Interview Preparation
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={() => handleMenuClose(setAnchorElProgrammes)}
                >
                  <Typography variant="body1">Study Groups</Typography>
                </MenuItem>
              </Menu>
              <Link href="/events" passHref>
                <Button color="inherit">
                  <Typography variant="body2">Events</Typography>
                </Button>
              </Link>
              <Link href="/blog" passHref>
                <Button color="inherit">
                  <Typography variant="body2">Blog</Typography>
                </Button>
              </Link>
              <Button
                color="inherit"
                onClick={(event) => handleMenuOpen(event, setAnchorElAboutUs)}
              >
                <Typography variant="body2">About Us</Typography>
              </Button>
              <Menu
                anchorEl={anchorElAboutUs}
                open={Boolean(anchorElAboutUs)}
                onClose={() => handleMenuClose(setAnchorElAboutUs)}
              >
                <MenuItem onClick={() => handleMenuClose(setAnchorElAboutUs)}>
                  Option 1
                </MenuItem>
                <MenuItem onClick={() => handleMenuClose(setAnchorElAboutUs)}>
                  Option 2
                </MenuItem>
                <MenuItem onClick={() => handleMenuClose(setAnchorElAboutUs)}>
                  Option 3
                </MenuItem>
              </Menu>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ borderRadius: "16px" }}
              >
                Find a mentor
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
