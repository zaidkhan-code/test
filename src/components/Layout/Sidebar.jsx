// Sidebar.jsx
import {
  Box,
  VStack,
  Icon,
  Text,
  Flex,
  IconButton,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdContacts,
  MdTimeline,
  MdArrowBack,
  MdArrowForward,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../store/slices/uiSlice";

const menuItems = [
  { path: "/dashboard", icon: MdDashboard, label: "Dashboard" },
  { path: "/contacts", icon: MdContacts, label: "Contacts" },
  { path: "/timeline", icon: MdTimeline, label: "Activity Timeline" },
];

export const Sidebar = ({
  display = { base: "block", md: "block" },
  position = "fixed",
  left = 0,
  top = 0,
  h = "100vh",
  w,
  transform,
  onClose,
}) => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.ui.isSidebarOpen);

  const sidebarWidth = isSidebarOpen ? "260px" : "70px";
  const bg = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      display={display}
      position={position}
      left={left}
      top={top}
      h={h}
      w={w || sidebarWidth}
      bg={bg}
      borderRight="1px solid"
      borderColor={borderColor}
      overflowY="auto"
      zIndex={1000}
      transform={transform || "none"}
      transition="all 0.3s"
      boxShadow="lg"
    >
      {/* Sidebar Header */}
      <Flex
        align="center"
        justify={isSidebarOpen ? "space-between" : "center"}
        h="70px"
        px={5}
        bgGradient="linear(to-r, gold.400, gold.500)"
        color="white"
        borderBottom="1px solid"
        borderColor={borderColor}
      >
        {isSidebarOpen && (
          <Text fontSize="lg" fontWeight="bold">
            Hammad CRM
          </Text>
        )}

        <IconButton
          icon={isSidebarOpen ? <MdArrowBack /> : <MdArrowForward />}
          onClick={() => dispatch(toggleSidebar())}
          variant="ghost"
          size="sm"
          color="white"
          _hover={{ bg: "gold.600" }}
          aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        />
      </Flex>

      {/* Menu Items */}
      <VStack spacing={1} align="stretch" p={2}>
        {menuItems.map((item) => (
          <NavLink key={item.path} to={item.path}>
            {({ isActive }) => (
              <Tooltip
                label={isSidebarOpen ? "" : item.label}
                placement="right"
              >
                <Flex
                  align="center"
                  gap={3}
                  p={3}
                  borderRadius="md"
                  bg={isActive ? "gold.100" : "transparent"}
                  color={isActive ? "gold.700" : "gray.600"}
                  fontWeight={isActive ? "600" : "400"}
                  _hover={{
                    bg: "gold.200",
                    color: "gold.800",
                    transform: "translateX(5px)",
                  }}
                  transition="all 0.2s"
                  justify={isSidebarOpen ? "flex-start" : "center"}
                  cursor="pointer"
                  onClick={onClose}
                >
                  <Icon as={item.icon} boxSize={5} />
                  {isSidebarOpen && <Text>{item.label}</Text>}
                </Flex>
              </Tooltip>
            )}
          </NavLink>
        ))}
      </VStack>
    </Box>
  );
};
