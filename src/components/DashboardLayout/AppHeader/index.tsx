import { Header, Flex, Image } from "@mantine/core";
import ThemeSwitcher from "components/shared/ThemeSwitcher";
import { Link } from "react-router-dom";

type Props = {};

function AppHeader({}: Props) {
  return (
    <Header height={60} p="sm">
      <Flex justify="space-between" align="center">
        <Link to="/dashboard">
          <Image
            src={
              "https://theperfectroundgolf.com/wp-content/uploads/2022/04/placeholder.png"
            }
            height={40}
            radius={10}
          />
        </Link>
        <Flex gap="sm" align="center">
          {/* <LanguageSwitcher />
          <DarkLightButton /> */}
          <ThemeSwitcher />
        </Flex>
      </Flex>
    </Header>
  );
}

export default AppHeader;
