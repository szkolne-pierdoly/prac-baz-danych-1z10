"use client";

import { Sequence } from "@/app/models/Sequence";
import {
  Card,
  CardBody,
  Divider,
  Button,
  Tabs,
  Tab,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalContent,
  Modal,
  Input,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  HomeIcon,
  MoreVerticalIcon,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import {
  deleteSequence,
  getSequence as getSequenceAction,
  updateSequence,
} from "@/app/actions/sequence";
import LoadingDialog from "@/app/components/loadingDialog";
import FirstPartView from "./firstPartView";
import SecondPartView from "./secondPartView";
import ThirdPartView from "./thirdPageView";

export default function SequenceClientPage({
  sequenceId,
}: {
  sequenceId: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowConfirmDelete, setIsShowConfirmDelete] = useState(false);
  const [isShowRename, setIsShowRename] = useState(false);

  const [sequence, setSequence] = useState<Sequence | undefined>(undefined);
  const [selectedTab, setSelectedTab] = useState<string>("part1");
  const [pageSequenceId, setPageSequenceId] = useState<string | null>(null);
  const [renameSequenceName, setRenameSequenceName] = useState<string | null>(
    sequence?.name ?? null,
  );

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    getSequence();
  }, []);

  useEffect(() => {
    setRenameSequenceName(sequence?.name ?? null);
  }, [sequence]);

  const getSequence = async () => {
    if (sequenceId) {
      setIsLoading(true);
      const result = await getSequenceAction(sequenceId);
      if (result.isSuccess) {
        setSequence(result.sequence);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const pathParts = pathname.split("/");
    if (pathParts.length > 3 && pathParts[2] === "sequences") {
      setPageSequenceId(pathParts[3]);
    } else {
      setPageSequenceId(null);
    }
  }, [pathname]);

  const handleDeleteSequence = async () => {
    if (sequence) {
      const result = await deleteSequence(sequence.id);
      if (result.isSuccess) {
        router.push("/db/sequences");
      }
    }
  };

  const handleRenameSequence = async () => {
    if (renameSequenceName) {
      if (sequence) {
        const result = await updateSequence(
          sequence.id,
          renameSequenceName ?? null,
          null,
        );
        console.log(result);
        if (result.isSuccess) {
          setSequence(result.sequence);
          setIsShowRename(false);
        }
      }
    }
  };

  const handleGoSequences = () => {
    if (pageSequenceId) {
      router.push("/db/sequences");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen py-4 gap-4 px-2 max-h-screen w-screen overflow-y-hidden">
      <Card className="w-full flex flex-row items-start justify-start max-w-5xl h-[64px] min-h-[64px] sticky top-0 z-10">
        <CardBody className="flex flex-row items-center justify-between gap-2">
          <div className="flex flex-row items-center justify-center gap-2">
            <Button
              variant="flat"
              color="default"
              onPress={() => router.push("/")}
              isIconOnly
            >
              <HomeIcon />
            </Button>
            <div
              onClick={handleGoSequences}
              className="text-2xl font-bold cursor-pointer"
            >
              Sekwencje
            </div>
            {pageSequenceId && (
              <span className="text-2xl font-bold text-gray-500">
                / Sekwencja ID{pageSequenceId}
              </span>
            )}
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            {pageSequenceId === null && (
              <Button
                variant="flat"
                color="primary"
                onPress={() => console.log("create")}
              >
                Dodaj sekwencję
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
      <div className="w-full flex flex-col items-start justify-start max-w-4xl max-h-[calc(100vh-96px)] overflow-y-scroll">
        <div className="flex flex-col gap-4 w-full items-center justify-center">
          <Card className="w-full max-h-[calc(100vh-160px)] overflow-y-scroll">
            <CardBody className="flex flex-row justify-between items-center min-h-[64px]">
              <div className="w-full">
                <div className="text-2xl font-bold">
                  Sekwencja: {sequence?.name}
                </div>
              </div>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="light" color="default" isIconOnly>
                    <MoreVerticalIcon />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    key="rename"
                    startContent={<PencilIcon />}
                    onPress={() => setIsShowRename(true)}
                  >
                    Zmień nazwę
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    startContent={<TrashIcon />}
                    color="danger"
                    onPress={() => setIsShowConfirmDelete(true)}
                  >
                    Usuń
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </CardBody>
            <Divider />
            <CardBody className="flex flex-col gap-2">
              <Tabs
                fullWidth
                selectedKey={selectedTab}
                onSelectionChange={(key) => setSelectedTab(key as string)}
              >
                <Tab key="part1" title="Pierwsza część" />
                <Tab key="part2" title="Druga część" />
                <Tab key="part3" title="Trzecia część" />
              </Tabs>
              {selectedTab === "part1" && (
                <FirstPartView sequenceId={sequenceId} />
              )}
              {selectedTab === "part2" && (
                <SecondPartView sequenceId={sequenceId} />
              )}
              {selectedTab === "part3" && (
                <ThirdPartView sequenceId={sequenceId} />
              )}
            </CardBody>
          </Card>
          <Modal
            isOpen={isShowConfirmDelete}
            onClose={() => setIsShowConfirmDelete(false)}
          >
            <ModalContent>
              <ModalHeader>Napewno?</ModalHeader>
              <ModalBody>
                Usunięcie sekwencji spowoduje usunięcie samej sekwencji, pytania
                dalej zostaną w bazie danych. Jest to akcja nieodwracalna!
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="flat"
                  color="danger"
                  className="px-8"
                  onPress={handleDeleteSequence}
                >
                  Usuń sekwencję
                </Button>
                <Button
                  variant="flat"
                  color="success"
                  className="w-full"
                  onPress={() => setIsShowConfirmDelete(false)}
                >
                  Anuluj
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Modal isOpen={isShowRename} onClose={() => setIsShowRename(false)}>
            <ModalContent>
              <ModalHeader>Zmień nazwę</ModalHeader>
              <ModalBody>
                <Input
                  value={renameSequenceName ?? ""}
                  onChange={(e) => setRenameSequenceName(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="flat"
                  color="default"
                  className="px-8"
                  onPress={() => setIsShowRename(false)}
                >
                  Anuluj
                </Button>
                <Button
                  variant="flat"
                  color="success"
                  className="w-full"
                  onPress={handleRenameSequence}
                >
                  Zmień nazwę
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <LoadingDialog isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
