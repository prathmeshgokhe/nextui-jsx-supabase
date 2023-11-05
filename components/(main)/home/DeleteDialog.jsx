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
import { Trash2 } from "lucide-react";
import supabase from "@/supabase/config";

// import { MailIcon } from "./MailIcon.jsx";
// import { LockIcon } from "./LockIcon.jsx";

export default function DeleteDialog({ speakerid }) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleDeleteClick = async () => {
    // When "Delete" button is clicked, hide the alert
    setShowDeleteAlert(false);

    const { error } = await supabase
      .from("speaker")
      .delete()
      .eq("id", speakerid);

    if (error) {
      alert("error");
    }
    alert(speakerid);
    // Show a toast notification
    // toast.success("Deleted Successfully");
    // window.location.reload();
  };

  return (
    <>
      <Button onPress={onOpen} isIconOnly variant="light" className="text-red">
        <Trash2 />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Delete
                </ModalHeader>
                <ModalBody>
                  <p>Delete everything.</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onClick={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onClick={handleDeleteClick}>
                    Delete
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </ModalContent>
      </Modal>
    </>
  );
}
