import { useDisclosure } from "@mantine/hooks";

import ChooseRole from "../components/ChooseRole/ChooseRole";
import Greetings from "../components/Greetings/Greetings";

const HomeContainer = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Greetings open={open} />
      <ChooseRole opened={opened} close={close} />
    </>
  );
};

export default HomeContainer;
