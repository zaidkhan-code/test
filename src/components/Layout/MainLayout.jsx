// import { Box, Flex } from "@chakra-ui/react";
// import { Sidebar } from "./Sidebar";
// import { Header } from "./Header";
// import { useSelector } from "react-redux";

// export const MainLayout = ({ children }) => {
//   const isSidebarOpen = useSelector((state) => state.ui.isSidebarOpen);
//   const sidebarWidth = isSidebarOpen ? 260 : 70;

//   return (
//     <Flex minH="100vh" bg="gray.50">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main content wrapper */}
//       <Box
//         flex="1"
//         ml={`${sidebarWidth}px`}
//         transition="margin-left 0.3s"
//         w={`calc(100% - ${sidebarWidth}px)`} // Prevent scroll
//         minH="100vh"
//         display="flex"
//         flexDirection="column"
//       >
//         {/* Header fixed */}
//         <Header />

//         {/* Page content */}
//         <Box flex="1" p={6} overflowX="hidden">
//           {children}
//         </Box>
//       </Box>
//     </Flex>
//   );
// };

import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useSelector } from "react-redux";

export const MainLayout = ({ children }) => {
  const isSidebarOpen = useSelector((state) => state.ui.isSidebarOpen);
  const sidebarWidth = isSidebarOpen ? 260 : 70;

  const { isOpen: isMobileOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex minH="100vh" bg="gray.50">
      {/* Desktop Sidebar */}
      <Sidebar display={{ base: "none", md: "block" }} />

      {/* Mobile Sidebar Drawer */}
      <Sidebar
        display={{ base: "block", md: "none" }}
        position="fixed"
        left={0}
        top={0}
        h="100vh"
        w="260px"
        zIndex={1000}
        transform={isMobileOpen ? "translateX(0)" : "translateX(-100%)"}
        transition="transform 0.3s"
        onClose={onClose}
      />

      {/* Main content */}
      <Box
        flex="1"
        ml={{ base: 0, md: `${sidebarWidth}px` }}
        w={{ base: "100%", md: `calc(100% - ${sidebarWidth}px)` }}
        transition="margin-left 0.3s"
        minH="100vh"
        display="flex"
        flexDirection="column"
      >
        {/* Header */}
        <Header onOpenSidebar={onOpen} />

        {/* Page Content */}
        <Box flex="1" p={{ base: 4, md: 6 }} overflowX="hidden">
          {children}
        </Box>
      </Box>
    </Flex>
  );
};
