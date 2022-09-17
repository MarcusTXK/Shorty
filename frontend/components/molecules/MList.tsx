import { List, ListIcon, ListItem, Text } from "@chakra-ui/layout";
import { HStack } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

interface MListProps {
  options: Array<{ id: number; desc: string }>;
}

const MList = ({ options }: MListProps) => {
  return (
    <List spacing={1} textAlign="start">
      {options.map((desc) => (
        <ListItem key={desc.id}>
          <HStack>
            <ListIcon as={FaCheckCircle} color="green.500" />
            <Text color={"gray.500"}>{desc.desc}</Text>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default MList;
