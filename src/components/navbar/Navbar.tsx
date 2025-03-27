import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation(); // 현재 위치를 가져옵니다.

  // 주어진 경로가 현재 위치와 일치하는지 확인하는 함수
  const isActive = (path: string) => location.pathname === path;

  return (
    <NavigationMenu className="p-5">
      <Link to="/">
        <NavigationMenuLink
          className={`mr-4 font-bold text-h1 ${
            isActive("/") ? "text-primary-700" : "text-primary-500"
          }`}
        >
          이력서닷컴
        </NavigationMenuLink>
      </Link>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/jobposting">
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} ${
                isActive("/jobposting") ? "bg-primary text-white" : ""
              }`}
            >
              취업공고
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/resume">
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} ${
                isActive("/resume") ? "bg-primary text-white" : ""
              }`}
            >
              이력서
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/calendar">
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} ${
                isActive("/calendar") ? "bg-primary text-white" : ""
              }`}
            >
              캘린더
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/study-group">
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} ${
                isActive("/study-group") ? "bg-primary text-white" : ""
              }`}
            >
              스터디그룹
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/board">
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} ${
                isActive("/board") ? "bg-primary text-white" : ""
              }`}
            >
              게시판
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default Navbar;
