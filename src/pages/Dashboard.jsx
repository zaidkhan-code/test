import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Text,
  Icon,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdContacts, MdToday, MdStar, MdTrendingUp } from "react-icons/md";
import { MainLayout } from "../components/Layout/MainLayout";
import { useContacts } from "../hooks/useContacts";
import { lazy, Suspense } from "react";
import { motion } from "framer-motion";

const ContactsChart = lazy(() =>
  import("../components/Dashboard/ContactsChart")
);

// Motion wrapper
const MotionStat = motion(Stat);

// StatCard component
const StatCard = ({ title, value, icon, color, trend }) => {
  // Chakra color values
  const bgColor = useColorModeValue(`${color}.100`, `${color}.700`);
  const iconColor = useColorModeValue(`${color}.600`, `${color}.300`);
  const arrowColor = trend >= 0 ? "green.400" : "red.400";

  return (
    <MotionStat
      bg={bgColor}
      color={useColorModeValue("gray.800", "white")}
      p={6}
      borderRadius="xl"
      position="relative"
      shadow="md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      <Flex justify="space-between" align="start">
        <Box>
          <StatLabel fontSize="sm" opacity={0.8} mb={2}>
            {title}
          </StatLabel>
          <StatNumber fontSize="3xl" fontWeight="bold">
            {value}
          </StatNumber>
          <StatHelpText color={arrowColor} mt={1}>
            <StatArrow type={trend >= 0 ? "increase" : "decrease"} />
            {Math.abs(trend)}% from yesterday
          </StatHelpText>
        </Box>
        <Icon
          as={icon}
          boxSize={12}
          opacity={0.2}
          color={iconColor}
          position="absolute"
          right={4}
          top={4}
        />
      </Flex>
    </MotionStat>
  );
};

export default function Dashboard() {
  const { totalContacts, todayContacts, favoriteContacts } = useContacts();
  const textColor = useColorModeValue("gray.700", "gray.300");

  return (
    <MainLayout>
      <Box>
        {/* Welcome Section */}
        <Flex align="center" gap={3} mb={8}>
          <Box>
            <Text fontSize="3xl" fontWeight="bold" color={textColor}>
              Hammad Real Estate CRM
            </Text>
            <Text color="gray.500">Welcome to the future of real estate</Text>
          </Box>
        </Flex>

        {/* Stats Section */}
        <Text fontSize="xl" fontWeight="600" mb={4}>
          Monthly Sales Performance
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
          <StatCard
            title="Total Contacts"
            value={totalContacts}
            icon={MdContacts}
            color="purple"
            trend={8}
          />
          <StatCard
            title="Added Today"
            value={todayContacts}
            icon={MdToday}
            color="pink"
            trend={12}
          />
          <StatCard
            title="Favorites"
            value={favoriteContacts}
            icon={MdStar}
            color="blue"
            trend={5}
          />
          <StatCard
            title="Target Achievement"
            value="2.6%"
            icon={MdTrendingUp}
            color="green"
            trend={-2}
          />
        </SimpleGrid>

        {/* Chart Section */}
        <MotionStat
          bg={useColorModeValue("white", "gray.700")}
          p={6}
          borderRadius="lg"
          boxShadow="sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
        >
          <Text fontSize="lg" fontWeight="600" mb={4}>
            Contact Growth
          </Text>
          <Suspense fallback={<Box h="300px" />}>
            <ContactsChart />
          </Suspense>
        </MotionStat>
      </Box>
    </MainLayout>
  );
}
