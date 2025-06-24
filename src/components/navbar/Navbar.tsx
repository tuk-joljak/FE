import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [showLogout, setShowLogout] = useState(false);

  // 로그인 여부 확인
  const mainUserId = typeof window !== "undefined" ? localStorage.getItem("mainUserId") : null;
  const userName = typeof window !== "undefined" ? localStorage.getItem("userName") : null;

  // 이니셜 추출 (없으면 아이콘)
  const getInitial = () => {
    if (userName && userName.length > 0) return userName[0];
    return "👤";
  };

  const handleLogout = () => {
    localStorage.removeItem("mainUserId");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-30 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center px-6 py-3 mx-auto max-w-7xl">
        {/* Logo */}
        <Link to="/" className="mr-8 text-2xl font-extrabold tracking-tight whitespace-nowrap text-primary-700">
          이력서닷컴
        </Link>
        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="gap-2 md:gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${isActive("/jobposting") ? "text-white bg-primary" : "transition hover:bg-primary/10 hover:text-primary"}`}>
                <Link to="/jobposting">취업공고</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${isActive("/resume") ? "text-white bg-primary" : "transition hover:bg-primary/10 hover:text-primary"}`}>
                <Link to="/resume">이력서</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${isActive("/calendar") ? "text-white bg-primary" : "transition hover:bg-primary/10 hover:text-primary"}`}>
                <Link to="/calendar">캘린더</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${isActive("/study-group") ? "text-white bg-primary" : "transition hover:bg-primary/10 hover:text-primary"}`}>
                <Link to="/study-group">스터디그룹</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${isActive("/board") ? "text-white bg-primary" : "transition hover:bg-primary/10 hover:text-primary"}`}>
                <Link to="/board">게시판</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {/* 로그인/프로필 */}
        {mainUserId ? (
          <div className="relative ml-6">
            <button
              className="flex justify-center items-center w-10 h-10 text-lg font-bold text-white rounded-full shadow transition bg-primary hover:opacity-80"
              onClick={() => setShowLogout(true)}
              title={userName || "프로필"}
            >
              {getInitial()}
            </button>
            {/* 로그아웃 다이얼로그 */}
            {showLogout && (
              <div className="flex absolute right-0 z-50 flex-col items-center p-4 mt-2 w-48 bg-white rounded border border-gray-200 shadow-lg">
                <div className="mb-3 font-semibold text-center text-gray-800">로그아웃 하시겠습니까?</div>
                <div className="flex gap-2 w-full">
                  <button
                    className="flex-1 px-3 py-1 text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => setShowLogout(false)}
                  >
                    취소
                  </button>
                  <button
                    className="flex-1 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                    onClick={handleLogout}
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="ml-6">
            <Button className="px-6 py-2 font-semibold text-white rounded-lg shadow transition-all bg-primary hover:bg-primary-700">
              로그인
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
