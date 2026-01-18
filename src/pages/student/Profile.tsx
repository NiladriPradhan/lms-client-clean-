import { useEffect, useState } from "react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";

interface UserData {
  name: string;
  email: string;
  photoUrl?: string;
}

export default function Profile() {
  const { data, isLoading, refetch } = useLoadUserQuery();
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();

  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    photoUrl: "",
  });

  const [file, setFile] = useState<File | null>(null);

  const user = data?.user;

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserData({
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl || "",
      });
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      if (file) formData.append("photo", file);

      await updateUser(formData).unwrap();
      toast.success("Profile updated successfully");
    } catch (error) {
      const err = error as FetchBaseQueryError;
      toast.error(
        (err?.data as { message?: string })?.message || "Update failed",
      );
    }
  };

  if (isLoading) return <Loader2 className="animate-spin mx-auto mt-10" />;
  if (!user) return <p className="text-center">No user found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={user.photoUrl || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>PM</AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>

        {/* Edit Profile */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>Edit Profile</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Update your personal information
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Profile Photo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>

              <div>
                <Label>Name</Label>
                <Input
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input value={userData.email} disabled />
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSave} disabled={updateLoading}>
                {updateLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Profile Info */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Your personal details</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label>Name</Label>
            <p className="font-medium">{user.name}</p>
          </div>

          <Separator />

          <div>
            <Label>Email</Label>
            <p className="font-medium">{user.email}</p>
          </div>

          <Separator />
        </CardContent>
      </Card>
    </div>
  );
}
