// Header.jsx
import {
  Box,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";

export const Header = ({ onOpenSidebar }) => {
  const { user, handleLogout } = useAuth();
  const isSidebarOpen = useSelector((state) => state.ui.isSidebarOpen);

  return (
    <Box
      as="header"
      h="70px"
      bgGradient="linear(to-r, gold.400, gold.500)"
      px={{ base: 4, md: 6 }}
      w="100%"
      position="sticky"
      top={0}
      zIndex={900}
      boxShadow="lg"
    >
      <Flex h="full" align="center" justify="space-between" gap={6}>
        {/* Mobile Hamburger */}
        <IconButton
          display={{ base: "inline-flex", md: "none" }}
          icon={<HamburgerIcon />}
          onClick={onOpenSidebar}
          aria-label="Open Sidebar"
          size="sm"
          variant="ghost"
          color="white"
          _hover={{ bg: "gold.600" }}
        />

        <Box flex="1">
          <Text
            fontSize="lg"
            fontWeight="bold"
            display={{ base: "inline", md: "none" }}
            color="white"
          >
            Hammad CRM
          </Text>
        </Box>

        {/* User Menu */}
        <Menu>
          <MenuButton _hover={{ bg: "gold.600" }} borderRadius="md">
            <HStack spacing={2} cursor="pointer">
              <Text fontSize="sm" fontWeight="500" color="white">
                Hi, {user?.name || "Admin"}
              </Text>
              <Avatar size="sm" bg="yellow.400" />
              <ChevronDownIcon color="white" />
            </HStack>
          </MenuButton>
          <MenuList borderRadius="md" boxShadow="lg" py={2}>
            <MenuItem _hover={{ bg: "gold.100" }}>Profile</MenuItem>
            <MenuItem _hover={{ bg: "red.100" }} onClick={handleLogout}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};
