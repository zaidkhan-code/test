import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Flex,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { handleLogin } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleLogin({ email, password });
    }
  };

  const handleForgotPassword = () => {
    toast({
      title: "Password reset link sent",
      description:
        "Please check your email for instructions to reset your password.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Flex minH="100vh">
      <MotionBox
        flex={1}
        bgImage="url('/Gemini_Generated_Image_l2xdpfl2xdpfl2xd.png')"
        bgSize="cover"
        bgPosition="center"
        display={{ base: "none", md: "flex" }}
        alignItems="center"
        justifyContent="center"
        p={12}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <MotionVStack
          spacing={6}
          textAlign="center"
          bg="rgba(0,0,0,0.6)"
          p={10}
          borderRadius="xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Text fontSize="5xl" fontWeight="bold" color="white">
            Hammad CRM
          </Text>
          <Text fontSize="2xl" color="white">
            Real Estate Management
          </Text>
          <Text color="whiteAlpha.800" maxW="400px">
            Seamlessly manage clients, properties, and leads with our all-in-one
            CRM solution.
          </Text>
        </MotionVStack>
      </MotionBox>

      <Flex flex={1} align="center" justify="center" p={8} bg="gray.50">
        <MotionBox
          w="full"
          maxW="450px"
          p={10}
          bg="white"
          borderRadius="xl"
          boxShadow="2xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <MotionVStack
            spacing={6}
            align="stretch"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {/* Branding */}
            <MotionVStack
              spacing={2}
              align="center"
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Text fontSize="3xl" fontWeight="bold" color="gold.600">
                Welcome Back
              </Text>
              <Text color="gray.600" textAlign="center">
                Sign in to access your Hammad CRM account.
              </Text>
            </MotionVStack>

            {/* Login Form */}
            <form onSubmit={onSubmit}>
              <VStack spacing={4}>
                <FormControl
                  isInvalid={errors.email}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <FormLabel>Email</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <EmailIcon color="gray.400" />
                    </InputLeftElement>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      bg="gray.50"
                    />
                  </InputGroup>
                  {errors.email && (
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={errors.password}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <LockIcon color="gray.400" />
                    </InputLeftElement>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      bg="gray.50"
                    />
                    <InputRightElement>
                      <IconButton
                        variant="ghost"
                        size="sm"
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Toggle password visibility"
                      />
                    </InputRightElement>
                  </InputGroup>
                  {errors.password && (
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  )}
                </FormControl>

                <Button
                  type="submit"
                  w="full"
                  bg="gold.500"
                  color="white"
                  _hover={{ bg: "gold.600", scale: 1.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </Button>

                <Text color="gray.500">or</Text>

                <Button
                  variant="link"
                  color="gray.600"
                  fontSize="sm"
                  onClick={onOpen}
                >
                  Forgot Password?
                </Button>

                <Text color="gray.600">
                  New here?{" "}
                  <Button variant="link" color="gold.500" fontSize="sm">
                    Sign up as an agent
                  </Button>
                </Text>
              </VStack>
            </form>
          </MotionVStack>
        </MotionBox>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Forgot Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Email Address</FormLabel>
                <Input placeholder="Enter your email" type="email" />
              </FormControl>
              <Button
                w="full"
                bg="gold.500"
                color="white"
                _hover={{ bg: "gold.600" }}
                onClick={handleForgotPassword}
              >
                Send Reset Link
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
