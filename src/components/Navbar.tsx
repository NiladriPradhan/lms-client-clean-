import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { School2, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useAppSelector } from "@/hooks";
import type { RootState } from "@/store";
import { useTheme } from "@/context/useTheme";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const role = "student";

  const { theme, setTheme } = useTheme();
  const [logoutUser, { data: logoutData, isSuccess }] = useLogoutUserMutation();

  console.log(user);

  const logoutHandler = async () => {
    await logoutUser({});
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(logoutData.message || "User logout successfully.");
      navigate("/login");
    }
  }, [navigate, isSuccess, logoutData]);
  if (!theme) return null;

  const themeClasses =
    theme === "light"
      ? "bg-white text-black"
      : theme === "dark"
        ? "bg-gray-900 text-white"
        : "bg-gray-950 text-white";

  return (
    <nav className={`${themeClasses} py-4 shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <School2 />
          <Link to="/">
            <h2 className="font-extrabold text-lg">E-Learning</h2>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      src={user?.photoUrl || "https://github.com/shadcn.png"}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-1" align="start">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    {role === "student" && (
                      <DropdownMenuItem>
                        <Link to={"/my-learning"}>My Learning</Link>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>
                      <button className="text-left font-medium">
                        <Link to="profile">Edit Profile</Link>
                      </button>

                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logoutHandler}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  {user?.role === "instructor" && (
                    <>
                      <DropdownMenuSeparator />
                      <Link to={"/admin/dashboard"}>
                        <Button className="w-full bg-green-700 text-white">
                          Dashboard
                        </Button>
                      </Link>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="bg-blue-600 text-white outline-0 border-0"
              >
                Sign up
              </Button>
              <Button className="bg-green-600 text-white outline-0 border-0">
                <Link to="/login">Log in</Link>
              </Button>
            </>
          )}

          <Select value={theme || "dark"} onValueChange={setTheme}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex md:hidden">
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const [logoutUser, { data: logoutData, isSuccess }] = useLogoutUserMutation();
  const { theme, setTheme } = useTheme();
  const role = "instructor";

  const logoutHandler = async () => {
    await logoutUser({});
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(logoutData.message || "User logout successfully.");
    }
  }, [isSuccess, logoutData]);

  if (!theme) return null;

  return (
    <Sheet>
      {/* Trigger */}
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>

      {/* Drawer */}
      <SheetContent side="right" className="flex flex-col">
        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between my-6">
          <SheetTitle>E-Learning</SheetTitle>

          <Select value={theme || "dark"} onValueChange={setTheme}>
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </SheetHeader>

        {/* Navigation */}
        <nav className="flex flex-col gap-4 mt-6 ml-6">
          {role !== "instructor" && (
            <SheetClose asChild>
              <button className="text-left font-medium">
                <Link to={"/my-learning"}>My Learning</Link>
              </button>
            </SheetClose>
          )}
          <SheetClose asChild>
            <button className="text-left font-medium">
              <Link to="profile">Edit Profile</Link>
            </button>
          </SheetClose>

          <SheetClose asChild>
            <button className="text-left font-medium" onClick={logoutHandler}>
              Logout
            </button>
          </SheetClose>
        </nav>

        {/* Footer (Instructor only) */}
        {role === "instructor" && (
          <SheetFooter className="mt-auto">
            <SheetClose asChild>
              <Button className="w-full">
                <Link to="/admin/dashboard">Dashboard</Link>
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

// const apiLimiter = rateLimit({
//   windowsMs: 10 *1000,
//   max: 5 ,
//   message: "Too many request"
// })
// app.use(apiLimiter)
