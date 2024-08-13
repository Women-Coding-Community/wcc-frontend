import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Button,
  Drawer,
  Grid,
  Icon,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { headerSetup } from '@utils/staticContent';

type SubNavItem = {
  title: string;
  path: string;
};

type NavBarMenuItem = {
  title: string;
  path?: string;
  subNav?: SubNavItem[];
};

export const NavBar = () => {
  const router = useRouter();
  const theme = useTheme();

  const [anchorElements, setAnchorElements] = React.useState<
    {} | { [key: string]: HTMLElement }
  >({ mentorship: null, programmes: null, aboutUs: null });
  const [mobileOpen, setMobileOpen] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuOpen = (
    menuKey: string,
    event: React.MouseEvent<HTMLElement>,
  ) => {
    setAnchorElements((prev) => ({
      ...prev,
      [menuKey]: event.currentTarget,
    }));
  };

  const handleMenuClose = (menuKey: string) => {
    setAnchorElements((prev) => ({
      ...prev,
      [menuKey]: null,
    }));
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems: { [key: string]: NavBarMenuItem } = headerSetup;

  const renderNavItems = (items: NavBarMenuItem[]) => {
    return items.map((item: NavBarMenuItem) => {
      if (item.path) {
        return (
          <Button
            key={item.title}
            sx={{ color: 'primary.dark', padding: '0 1.5rem' }}
            onClick={() => router.push(item.path || '')}
          >
            {item.title}
          </Button>
        );
      } else {
        return (
          <Button
            key={item.title}
            aria-controls={`${item.title}-menu`}
            aria-haspopup="true"
            sx={{ color: 'primary.dark', padding: '0 1.5rem' }}
            onClick={(event) => handleMenuOpen(item.title, event)}
          >
            {item.title} <Icon>arrow_drop_down</Icon>
          </Button>
        );
      }
    });
  };

  const renderDropdownMenu = (
    menuKey: keyof typeof anchorElements,
    items: SubNavItem[],
  ) => {
    const anchorEl = anchorElements[menuKey] as HTMLElement;

    return (
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleMenuClose(menuKey)}
        data-testid="subNav"
      >
        {items.map((item: SubNavItem, index: number) => (
          <MenuItem
            key={`${item.title}-${index}`}
            onClick={() => {
              handleMenuClose(menuKey);
              router.push(item.path);
            }}
          >
            <Typography variant="body1">{item.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    );
  };

  return (
    <Box>
      <AppBar
        position="static"
        color="transparent"
        sx={{
          height: '130px',
          display: 'flex',
          justifyContent: isMobile ? 'space-around' : 'center',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: isMobile ? '100%' : '60%',
            height: '100%',
          }}
        >
          <Image src="/logo_white.png" alt="Logo" width={80} height={80} />
          {!isMobile && (
            <>
              <Grid container justifyContent="end">
                {renderNavItems(Object.values(menuItems))}
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{ borderRadius: '16px' }} // should be replaced once we update the design
                >
                  Find a mentor
                </Button>
              </Grid>
              {Object.keys(menuItems).map((key) =>
                menuItems[key].subNav
                  ? renderDropdownMenu(
                      key as keyof typeof anchorElements,
                      menuItems[key].subNav as SubNavItem[],
                    )
                  : null,
              )}
            </>
          )}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {/* <List>
        // Todo how does the mobile look like
        /List> */}
      </Drawer>
    </Box>
  );
};
