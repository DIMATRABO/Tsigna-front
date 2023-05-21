import { Group, NavLink } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
// import { useStyles } from '../../shared/styles';
// import { Link } from '../../shared/types';
import { useContext } from "react";
// import { UserContext } from 'context/user';
import "./links.css";
import { useStyles } from "components/shared/styles";
import { Link } from "types/link";
// import { useTranslation } from 'react-i18next';
import { useMediaQuery } from "@mantine/hooks";

type Props = {
  links: Link[];
};

const MainLinks = ({ links }: Props) => {
  // const { t } = useTranslation();
  const { classes } = useStyles();
  // const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 765px)");

  return (
    <Group>
      {links.map((link, i) => {
        // if (user && !link.roles?.includes(user.role)) {
        //   return null;
        // }

        if (link.links) {
          const nestedLinks = link.links?.map((link, i) => {
            return (
              <NavLink
                key={link.path}
                className={classes.mainLink}
                active={location.pathname === link.path}
                onClick={() => link.path && navigate(link.path)}
                // label={t(`menu.${link.label}`)}
                label={link.label}
                icon={<link.icon />}
                mb="sm"
              />
            );
          });

          return (
            <NavLink
              key={i}
              label={link.label}
              icon={<link.icon />}
              className={classes.mainLink}
            >
              {nestedLinks}
            </NavLink>
          );
        }

        return (
          <NavLink
            // label={t(`menu.${link.label}`)}
            label={isMobile ? null : link.label}
            onClick={() => link.path && navigate(link.path)}
            icon={<link.icon />}
            className={classes.mainLink}
            active={location.pathname === link.path}
            color="violet"
            p="xs"
            key={link.path}
          />
        );
      })}
    </Group>
  );
};

export default MainLinks;
