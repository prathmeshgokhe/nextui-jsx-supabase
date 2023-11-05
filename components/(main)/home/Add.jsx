import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import supabase from "@/supabase/config";
import { Plus } from "lucide-react";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(formData); // Log the form data
    const { data, error } = await supabase.from("speaker").insert(formData);
    if (error) {
      alert(error);
      console.log(error);
    } else {
      //   alert("Success");
      window.location.reload();
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-foreground text-background"
        size="sm"
        endContent={<Plus />}
      >
        Add Speaker
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Users
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Name"
                  placeholder="Enter your name"
                  variant="bordered"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <Input
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  variant="bordered"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
                <Input
                  label="Message"
                  placeholder="Enter your message"
                  variant="bordered"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  size="sm"
                  variant="flat"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  onPress={handleSubmit}
                  className="bg-foreground text-background"
                  size="sm"
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
