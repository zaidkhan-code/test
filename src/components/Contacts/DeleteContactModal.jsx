import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../store/slices/uiSlice';
import { useContacts } from '../../hooks/useContacts';

export const DeleteContactModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.activeModal === 'delete');
  const selectedContact = useSelector((state) => state.ui.selectedContact);
  const { deleteContact } = useContacts();
  const toast = useToast();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleDelete = () => {
    deleteContact(selectedContact.id);
    toast({
      title: 'Contact deleted',
      description: 'Contact has been successfully deleted',
      status: 'success',
      duration: 3000,
    });
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Contact</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to delete{' '}
            <strong>{selectedContact?.name}</strong>? This action cannot be
            undone.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={handleClose}>
            Cancel
          </Button>
          <Button colorScheme="red" onClick={handleDelete}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
