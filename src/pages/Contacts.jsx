import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  HStack,
  Text,
  Skeleton,
  Badge,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  SearchIcon,
  EditIcon,
  DeleteIcon,
  StarIcon,
  AddIcon,
} from "@chakra-ui/icons";
import { MainLayout } from "../components/Layout/MainLayout";
import { useContacts } from "../hooks/useContacts";
import { useDispatch } from "react-redux";
import { openModal } from "../store/slices/uiSlice";
import { useState } from "react";
import { AddContactModal } from "../components/Contacts/AddContactModal";
import { EditContactModal } from "../components/Contacts/EditContactModal";
import { DeleteContactModal } from "../components/Contacts/DeleteContactModal";

export default function Contacts() {
  const {
    paginatedContacts,
    searchQuery,
    setSearchQuery,
    currentPage,
    totalPages,
    setCurrentPage,
    filteredContacts,
    toggleFavorite,
  } = useContacts();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <MainLayout>
      <Box>
        <Flex justify="space-between" align="center" mb={6}>
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color="gray.800">
              Contacts
            </Text>
            <Text color="gray.600">
              Manage your contacts ({filteredContacts.length} total)
            </Text>
          </Box>
          <Button
            leftIcon={<AddIcon />}
            bg="gold.500"
            color="white"
            _hover={{ bg: "gold.600" }}
            onClick={() => dispatch(openModal({ type: "add" }))}
          >
            Add Contact
          </Button>
        </Flex>

        {/* Search Bar */}
        <Box bg="white" p={6} borderRadius="lg" mb={6}>
          <InputGroup>
            <InputLeftElement>
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search by name, email, company, or phone..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </InputGroup>
        </Box>

        {/* Table */}
        <Box bg="white" borderRadius="lg" overflow="hidden" boxShadow="sm">
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead bg="gold.100" position="sticky" top={0} zIndex={1}>
                <Tr>
                  <Th color="gold.800">Name</Th>
                  <Th color="gold.800">Email</Th>
                  <Th color="gold.800">Phone</Th>
                  <Th color="gold.800">Company</Th>
                  <Th color="gold.800">Status</Th>
                  <Th color="gold.800">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <Tr key={i}>
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                    </Tr>
                  ))
                ) : paginatedContacts.length === 0 ? (
                  <Tr>
                    <Td colSpan={6} textAlign="center" py={10}>
                      <Text color="gray.500" fontSize="lg">
                        No contacts found
                      </Text>
                      <Text color="gray.400" fontSize="sm">
                        {searchQuery
                          ? "Try adjusting your search"
                          : "Add your first contact to get started"}
                      </Text>
                    </Td>
                  </Tr>
                ) : (
                  paginatedContacts.map((contact) => (
                    <Tr key={contact.id} _hover={{ bg: "gray.50" }}>
                      <Td fontWeight="500">{contact.name}</Td>
                      <Td color="gray.600">{contact.email}</Td>
                      <Td color="gray.600">{contact.phone}</Td>
                      <Td color="gray.600">{contact.company}</Td>
                      <Td>
                        <Badge colorScheme="green">Active</Badge>
                      </Td>
                      <Td>
                        <HStack spacing={2}>
                          <IconButton
                            icon={<StarIcon />}
                            size="sm"
                            variant="ghost"
                            colorScheme={contact.isFavorite ? "yellow" : "gray"}
                            onClick={() => {
                              const action = contact.isFavorite
                                ? "removed from"
                                : "added to";
                              toast({
                                title: `Contact ${action} favorites`,
                                description: `Contact has been successfully ${action} favorites`,
                                status: contact.isFavorite ? "info" : "success",
                                duration: 3000,
                              });

                              toggleFavorite(contact.id);
                            }}
                            aria-label="Toggle favorite"
                          />
                          <IconButton
                            icon={<EditIcon />}
                            size="sm"
                            variant="ghost"
                            colorScheme="blue"
                            onClick={() => {
                              dispatch(openModal({ type: "edit", contact }));
                            }}
                            aria-label="Edit contact"
                          />
                          <IconButton
                            icon={<DeleteIcon />}
                            size="sm"
                            variant="ghost"
                            colorScheme="red"
                            onClick={() =>
                              dispatch(openModal({ type: "delete", contact }))
                            }
                            aria-label="Delete contact"
                          />
                        </HStack>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </Box>

          {/* Pagination */}
          {totalPages > 1 && (
            <Flex
              justify="space-between"
              align="center"
              p={4}
              borderTop="1px"
              borderColor="gray.200"
            >
              <Text color="gray.600">
                Page {currentPage} of {totalPages}
              </Text>
              <HStack>
                <Button
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  isDisabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  isDisabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </HStack>
            </Flex>
          )}
        </Box>
      </Box>

      <AddContactModal />
      <EditContactModal />
      <DeleteContactModal />
    </MainLayout>
  );
}
