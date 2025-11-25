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
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../store/slices/uiSlice';
import { useContacts } from '../../hooks/useContacts';

export const EditContactModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.activeModal === 'edit');
  const selectedContact = useSelector((state) => state.ui.selectedContact);
  const { updateContact } = useContacts();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  useEffect(() => {
    if (selectedContact) {
      setFormData({
        name: selectedContact.name || '',
        email: selectedContact.email || '',
        phone: selectedContact.phone || '',
        company: selectedContact.company || '',
      });
    }
  }, [selectedContact]);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      toast({
        title: 'Error',
        description: 'Name and email are required',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    updateContact({ ...formData, id: selectedContact.id });
    toast({
      title: 'Contact updated',
      description: 'Contact has been successfully updated',
      status: 'success',
      duration: 3000,
    });
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Contact</ModalHeader>
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
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
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
          <Button bg="gold.500" color="white" _hover={{ bg: 'gold.600' }} onClick={handleSubmit}>
            Update Contact
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
