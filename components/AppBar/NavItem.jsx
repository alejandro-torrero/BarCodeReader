import React from "react";
import { Link, useLocation } from "react-router-native";
import CustomButton from "./CustomButton";
import { TouchableOpacity, Text } from "react-native";
import theme from "../../theme/theme";

const NavItem = ({ to, title, activeIcon }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  let icon = active ? activeIcon : activeIcon + "-outline";
  return (
    <Link to={to} underlayColor={theme.colors.accent} style={{
      borderRadius:10
    }}>
      <CustomButton title={title} icon={icon} active={active} />
    </Link>
  );
};

export default NavItem;
