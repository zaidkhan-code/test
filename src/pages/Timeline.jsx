import {
  Box,
  Text,
  VStack,
  Flex,
  Icon,
  Badge,
} from '@chakra-ui/react';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import { MainLayout } from '../components/Layout/MainLayout';
import { useContacts } from '../hooks/useContacts';

const ActivityIcon = ({ type }) => {
  const icons = {
    add: { icon: MdAdd, color: 'green' },
    edit: { icon: MdEdit, color: 'blue' },
    delete: { icon: MdDelete, color: 'red' },
  };
  
  const config = icons[type] || icons.add;
  
  return (
    <Flex
      w="40px"
      h="40px"
      borderRadius="full"
      bg={`${config.color}.100`}
      align="center"
      justify="center"
    >
      <Icon as={config.icon} color={`${config.color}.600`} boxSize={5} />
    </Flex>
  );
};

export default function Timeline() {
  const { activities } = useContacts();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getActivityText = (activity) => {
    switch (activity.type) {
      case 'add':
        return `Added new contact`;
      case 'edit':
        return `Updated contact`;
      case 'delete':
        return `Deleted contact`;
      default:
        return 'Unknown activity';
    }
  };

  return (
    <MainLayout>
      <Box>
        <Text fontSize="2xl" fontWeight="bold" color="gray.800" mb={2}>
          Activity Timeline
        </Text>
        <Text color="gray.600" mb={6}>
          View all recent activities and changes
        </Text>

        <Box bg="white" borderRadius="lg" p={6}>
          {activities.length === 0 ? (
            <Box textAlign="center" py={10}>
              <Text color="gray.500" fontSize="lg">
                No activities yet
              </Text>
              <Text color="gray.400" fontSize="sm">
                Activities will appear here as you manage contacts
              </Text>
            </Box>
          ) : (
            <VStack spacing={6} align="stretch">
              {activities.map((activity, index) => (
                <Flex key={activity.id} gap={4} position="relative">
                  {index !== activities.length - 1 && (
                    <Box
                      position="absolute"
                      left="20px"
                      top="50px"
                      bottom="-30px"
                      w="2px"
                      bg="gray.200"
                    />
                  )}
                  
                  <ActivityIcon type={activity.type} />
                  
                  <Box flex={1}>
                    <Flex justify="space-between" align="start" mb={2}>
                      <Box>
                        <Text fontWeight="600" color="gray.800">
                          {getActivityText(activity)}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          Contact: <strong>{activity.contactName}</strong>
                        </Text>
                      </Box>
                      <Badge
                        colorScheme={
                          activity.type === 'add'
                            ? 'green'
                            : activity.type === 'edit'
                            ? 'blue'
                            : 'red'
                        }
                      >
                        {activity.type.toUpperCase()}
                      </Badge>
                    </Flex>
                    <Text fontSize="xs" color="gray.500">
                      {formatDate(activity.timestamp)}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </VStack>
          )}
        </Box>
      </Box>
    </MainLayout>
  );
}
