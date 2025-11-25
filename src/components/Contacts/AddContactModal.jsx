import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../store/slices/uiSlice";
import { useContacts } from "../../hooks/useContacts";

export const AddContactModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.activeModal === "add");
  const { addContact } = useContacts();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const handleClose = () => {
    dispatch(closeModal());
    setFormData({ name: "", email: "", phone: "", company: "" });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Name and email are required",
        status: "error",
        duration: 3000,
      });
      return;
    }

    addContact(formData);
    toast({
      title: "Contact added",
      description: "Contact has been successfully added",
      status: "success",
      duration: 3000,
    });
    handleClose();
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, phone: value });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Contact</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter name"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter email"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input
                type="tel"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="Enter phone"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Company</FormLabel>
              <Input
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                placeholder="Enter company"
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            bg="gold.500"
            color="white"
            _hover={{ bg: "gold.600" }}
            onClick={handleSubmit}
          >
            Add Contact
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
