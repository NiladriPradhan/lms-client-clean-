import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useRegisterUserMutation,
  useLoginUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { userLoggedIn } from "@/features/authSlice";
import { useDispatch } from "react-redux";

/* ---------------- TYPES ---------------- */
type Role = "instructor" | "student";

type SignUpState = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

type LoginState = {
  email: string;
  password: string;
  role: Role;
};

/* ---------------- COMPONENT ---------------- */

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signupInput, setSignupInput] = useState<SignUpState>({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [loginInput, setLoginInput] = useState<LoginState>({
    email: "",
    password: "",
    role: "student",
  });

  const [
    registerUser,
    {
      isSuccess: registerIsSuccess,
      data: registerData,
      isLoading: registerIsLoading,
      error: signUpError,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
      data: loginData,
      error: loginError,
    },
  ] = useLoginUserMutation();

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "login" | "signup",
  ) => {
    const { name, value } = e.target;

    if (type === "login") {
      setLoginInput((prev) => ({ ...prev, [name]: value }));
    } else {
      setSignupInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRoleChange = (role: Role, type: "login" | "signup") => {
    if (type === "login") {
      setLoginInput((prev) => ({ ...prev, role: role }));
    } else {
      setSignupInput((prev) => ({ ...prev, role: role }));
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    type: "login" | "signup",
  ) => {
    e.preventDefault();

    try {
      if (type === "login") {
        await loginUser(loginInput).unwrap();
        console.log("Login success:", loginInput);
      } else {
        await registerUser(signupInput).unwrap();
        console.log("Register success:", signupInput);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Auth error:", msg);
      // showErrorToast(msg);
    }
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successfully");
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Signup successfully");
      // dispatch(
      //   userLoggedIn({
      //     ...loginData.user,
      //     role: loginInput.role,
      //   })
      // );
      dispatch(
        userLoggedIn({
          id: loginData?.user?._id || "",
          name: loginData?.user?.name || "",
          email: loginData?.user?.email || "",
          role: loginInput.role,
          bio: loginData?.user?.bio,
          photoUrl: loginData?.user?.photoUrl,
        }),
      );

      navigate("/");
    }
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successfully");
    }
  }, [
    registerIsSuccess,
    registerData,
    registerUser,
    loginUser,
    loginIsSuccess,
    loginData,
    registerIsLoading,
    loginIsLoading,
    loginError,
    signUpError,
    navigate,
    dispatch,
    loginInput.role,
  ]);

  /* ---------------- UI ---------------- */

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm">
        <Tabs defaultValue="login">
          <TabsList className="w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
          </TabsList>

          {/* ---------------- LOGIN ---------------- */}
          <TabsContent value="login">
            <Card>
              <form onSubmit={(e) => handleSubmit(e, "login")}>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>
                    Enter your email and password to login
                  </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      name="email"
                      required
                      value={loginInput.email}
                      onChange={(e) => handleChange(e, "login")}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Password</Label>
                    <Input
                      type="password"
                      name="password"
                      required
                      value={loginInput.password}
                      onChange={(e) => handleChange(e, "login")}
                    />
                  </div>
                  <Select
                    value={loginInput.role}
                    onValueChange={(value) =>
                      handleRoleChange(value as Role, "login")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="instructor">Instructor</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>

                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loginIsLoading}
                  >
                    {loginIsLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* ---------------- SIGNUP ---------------- */}
          <TabsContent value="signup">
            <Card>
              <form onSubmit={(e) => handleSubmit(e, "signup")}>
                <CardHeader>
                  <CardTitle>Signup</CardTitle>
                  <CardDescription>Create a new account</CardDescription>
                </CardHeader>

                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Username</Label>
                    <Input
                      type="text"
                      name="name"
                      required
                      value={signupInput.name}
                      onChange={(e) => handleChange(e, "signup")}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      name="email"
                      required
                      value={signupInput.email}
                      onChange={(e) => handleChange(e, "signup")}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Password</Label>
                    <Input
                      type="password"
                      name="password"
                      required
                      value={signupInput.password}
                      onChange={(e) => handleChange(e, "signup")}
                    />
                  </div>
                  <Select
                    value={signupInput.role}
                    onValueChange={(value) =>
                      handleRoleChange(value as Role, "signup")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="instructor">Instructor</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>

                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={registerIsLoading}
                  >
                    {registerIsLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Signup"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
