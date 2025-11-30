import { ExpandMore, ExpandLess } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import {
  Box,
  Button,
  Drawer,
  Grid,
  List,
  ListItemButton,
  ListItemText,
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuOpen = (
    menuKey: string,
    event: React.MouseEvent<HTMLElement>,
  ) => {
    setAnchorElements((prev) => ({
      ...prev,
      [menuKey]: event.currentTarget,
    }));
    setActiveDropdown((prev) => (prev === menuKey ? null : menuKey));
  };

  const handleMenuClose = (menuKey: string) => {
    setAnchorElements((prev) => ({
      ...prev,
      [menuKey]: null,
    }));

    setMobileOpen(false);
    setActiveDropdown(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavItemClick = (path: string) => {
    router.push(path);
    setActiveDropdown(null);
    setMobileOpen(false);
  };

  const menuItems: { [key: string]: NavBarMenuItem } = headerSetup;

  const renderNavItems = (items: NavBarMenuItem[]) => {
    return items.map((item: NavBarMenuItem, index) => {
      if (item.path) {
        return (
          <Button
            key={`${item.path}-${index}`}
            sx={{ color: 'primary.dark', padding: '0 1.5rem' }}
            onClick={() => router.push(item.path || '')}
          >
            {item.title}
          </Button>
        );
      } else {
        return (
          <Button
            key={`${item.title}-${index}`}
            aria-controls={`${item.title}-menu`}
            aria-haspopup="true"
            sx={{
              color: 'primary.dark',
              padding: '0 1.5rem',
              fontSize: '1rem',
            }}
            onClick={(event) => handleMenuOpen(item.title, event)}
          >
            {item.title} <ExpandMore />
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
            key={`${item.title}-${index}-menu-item`}
            onClick={() => {
              handleMenuClose(menuKey);
              router.push(item.path);
            }}
          >
            <Typography>{item.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    );
  };

  const renderMobileNavItems = (items: NavBarMenuItem[]) => {
    return items.map((item: NavBarMenuItem, index) => {
      if (item.path) {
        return (
          <List component="div" disablePadding key={`${item.path}-${index}`}>
            <ListItemButton
              sx={{
                color: 'primary.dark',
                padding: '0.5rem 1rem',
                fontSize: '18px',
                '&.Mui-active': {
                  backgroundColor: theme.palette.custom?.softGray,
                },
                '&:hover': {
                  backgroundColor: theme.palette.custom?.softGray,
                  borderRadius: '100px',
                },
              }}
              onClick={() => {
                router.push(item.path || '');
                handleMenuClose(item.title);
              }}
            >
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{ fontSize: '16px' }}
              />
            </ListItemButton>
          </List>
        );
      } else {
        return (
          <div key={`${item.title}-${index}`}>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{
                  color: 'primary.dark',
                  padding: '0.5rem 1rem',
                  fontSize: '18px',
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.custom?.softGray,
                  },
                  '&:hover': {
                    backgroundColor: theme.palette.custom?.softGray,
                    borderRadius: '100px',
                  },
                }}
                onClick={(event) => handleMenuOpen(item.title, event)}
              >
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{ fontSize: '16px' }}
                />
                {activeDropdown === item.title ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItemButton>
              {activeDropdown === item.title &&
                item.subNav &&
                renderMobileDropdownMenu(item.title, item.subNav)}
            </List>
          </div>
        );
      }
    });
  };

  const renderMobileDropdownMenu = (menuKey: string, items: SubNavItem[]) => {
    return (
      <List component="div" disablePadding>
        {items.map((item: SubNavItem, index: number) => (
          <ListItemButton
            key={`${item.title}-${index}-subitem`}
            sx={{
              color: 'primary.dark',
              padding: '0.2rem 1rem',
              margin: '1rem 2rem',
              '&.Mui-active': {
                backgroundColor: theme.palette.secondary.light,
                borderRadius: '100px',
                '&:hover': {
                  backgroundColor: theme.palette.secondary.light,
                },
              },
              '&:hover': {
                backgroundColor: theme.palette.secondary.light,
                borderRadius: '100px',
              },
            }}
            onClick={() => {
              handleNavItemClick(item.path);
            }}
            data-testid="subNav"
          >
            <ListItemText primary={item.title} />
          </ListItemButton>
        ))}
      </List>
    );
  };

  return (
    <>
      <AppBar
        position="static"
        color="transparent"
        sx={{
          height: isMobile ? '90px' : '130px',
          display: 'flex',
          justifyContent: isMobile ? 'space-around' : 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            height: isMobile ? '80%' : '100%',
          }}
        >
          <Image
            src="/logo_white.png"
            alt="Logo"
            width={isMobile ? 60 : 80}
            height={isMobile ? 60 : 80}
            onClick={() => router.push('/')}
          />
          {!isMobile && (
            <>
              <Grid container justifyContent="end">
                {renderNavItems(Object.values(menuItems))}
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{ borderRadius: '100px' }}
                  onClick={() => router.push('/mentorship/mentors')}
                >
                  Find a mentor
                </Button>
              </Grid>
              {Object.keys(menuItems).map((key) =>
                menuItems[key].subNav ? (
                  <React.Fragment key={key}>
                    {renderDropdownMenu(
                      key as keyof typeof anchorElements,
                      menuItems[key].subNav as SubNavItem[],
                    )}
                  </React.Fragment>
                ) : null,
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
        sx={{
          flexShrink: 0,
          display: { xs: 'inherit', sm: 'none' },
          '& .MuiDrawer-paper': {
            height: '100%',
            width: '354px',
          },
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="close"
          onClick={handleDrawerToggle}
          sx={{
            display: { xs: 'flex', md: 'none' },
            justifyContent: 'flex-start',
            padding: '0.875rem 0.75rem',
            margin: '0.5rem 1rem',
          }}
        >
          <MenuOpenIcon />
        </IconButton>

        {isMobile && (
          <>
            <Grid
              container
              alignItems="left"
              direction="column"
              sx={{
                width: '100%',
                height: 'auto',
                margin: '0rem',
              }}
            >
              <Box
                sx={{
                  padding: '0rem 1rem',
                }}
              >
                {renderMobileNavItems(Object.values(menuItems))}
              </Box>

              <Button
                variant="outlined"
                size="small"
                color="inherit"
                sx={{
                  borderRadius: '100px',
                  width: '40%',
                  padding: '0.5rem 1rem',
                  margin: ' 0.8rem 1.5rem',
                }}
              >
                Find a mentor
              </Button>
            </Grid>
          </>
        )}
      </Drawer>
    </>
  );
};
