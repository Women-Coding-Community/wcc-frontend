// components/Navbar.tsx
"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
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
            <Link href="/" passHref>
              <Image src="/logo_white.png" alt="Logo" width={60} height={60} />
            </Link>
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "right" }}>
              <Link href="/" passHref>
                <Button color="inherit" sx={{ textTransform: "none" }}>
                  Home
                </Button>
              </Link>
              <Link href="/mentorship" passHref>
                <Button
                  color="inherit"
                  onClick={(event) =>
                    handleMenuOpen(event, setAnchorElMentorship)
                  }
                  sx={{ textTransform: "none" }}
                >
                  Mentorship
                </Button>
              </Link>
              <Menu
                anchorEl={anchorElMentorship}
                open={Boolean(anchorElMentorship)}
                onClose={() => handleMenuClose(setAnchorElMentorship)}
              >
                <MenuItem
                  onClick={() => handleMenuClose(setAnchorElMentorship)}
                >
                  Option 1
                </MenuItem>
                <MenuItem
                  onClick={() => handleMenuClose(setAnchorElMentorship)}
                >
                  Option 2
                </MenuItem>
                <MenuItem
                  onClick={() => handleMenuClose(setAnchorElMentorship)}
                >
                  Option 3
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
                  Option 1
                </MenuItem>
                <MenuItem
                  onClick={() => handleMenuClose(setAnchorElProgrammes)}
                >
                  Option 2
                </MenuItem>
                <MenuItem
                  onClick={() => handleMenuClose(setAnchorElProgrammes)}
                >
                  Option 3
                </MenuItem>
              </Menu>
              <Link href="/events" passHref>
                <Button color="inherit">Events</Button>
              </Link>
              <Link href="/blog" passHref>
                <Button color="inherit">Blog</Button>
              </Link>
              <Button
                color="inherit"
                onClick={(event) => handleMenuOpen(event, setAnchorElAboutUs)}
                sx={{ textTransform: "none" }}
              >
                About Us
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
              <Link href="/find-a-mentor" passHref>
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{ borderRadius: "16px" }}
                >
                  Find a mentor
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
