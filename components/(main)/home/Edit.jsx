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
import { Plus, Edit2 } from "lucide-react";
import supabase from "@/supabase/config";

export default function App(id) {
  const helloId = id.speakerid;
  // alert(helloId);
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

  const handleUpdate = async (helloId) => {
    try {
      const { data, error } = await supabase
        .from("speaker")
        .select("*")
        .eq("id", helloId)
        .single();
      if (error) {
        throw error;
      }
      if (data) {
        setFormData({
          ...formData, // Spread the existing object to keep its other properties
          id: data.id,
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          message: data.message,
        });
      } else {
        console.log("row not found");
      }
    } catch (error) {
      console.error("error fetching data:", error.message);
    }
    // alert(helloId);
  };

  const updateData = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("speaker")
        .update({
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          message: formData.message,
        })
        .eq("id", helloId)
        .single();
      if (error) {
        console.error("update error", error);
        return;
      }
      console.log("data update", data);
      window.location.reload();

      function showToastAndRefresh(message) {
        toast.success(message);

        setTimeout(function () {
          location.reload();
        }, 1000);
      }
      showToastAndRefresh("Data Updated Successfully !");
    } catch (error) {
      console.error("update error", error);
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        variant="light"
        size="sm"
        onClick={() => handleUpdate(helloId)}
        // endContent={<Plus />}
      >
        <Edit2 />
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
                  onClick={updateData}
                  className="bg-foreground text-background"
                  size="sm"
                >
                  Save changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
