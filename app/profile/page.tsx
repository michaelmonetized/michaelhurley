"use client";

import { useCallback } from "react";
import Layout from "@/components/ui/layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Form } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

const profileSchema = z.object({
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  bio: z.string().max(280, "Bio must be 280 characters or fewer"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const defaultValues: ProfileFormValues = {
  displayName: "Michael Hurley",
  email: "michael@hustlelaunch.io",
  bio: "Building the future of creator-led growth. Shipping fast and breaking conventions.",
};

export default function ProfilePage() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const onSubmit = useCallback(async (values: ProfileFormValues) => {
    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success("Profile updated successfully.", {
      description: `Saved as ${values.displayName}`,
    });
  }, []);

  return (
    <Layout variant="default">
      <main className="mx-auto w-full max-w-[42rem] px-4 py-10">
        <h1 className="mb-6 text-lg font-bold">Profile</h1>

        <Tabs defaultValue="view">
          <TabsList>
            <TabsTrigger value="view">View</TabsTrigger>
            <TabsTrigger value="edit">Edit</TabsTrigger>
          </TabsList>

          {/* ---- View Tab ---- */}
          <TabsContent value="view">
            <Card>
              <CardContent className="flex flex-col items-center gap-4 pt-6">
                <Avatar className="size-20">
                  <AvatarImage
                    src="/avatar-placeholder.png"
                    alt="Michael Hurley"
                  />
                  <AvatarFallback className="text-lg">MH</AvatarFallback>
                </Avatar>

                <div className="text-center">
                  <h2 className="text-sm font-bold">Michael Hurley</h2>
                  <p className="text-xs text-muted-foreground">
                    michael@hustlelaunch.io
                  </p>
                </div>

                <p className="max-w-[24rem] text-center text-xs text-muted-foreground">
                  Building the future of creator-led growth. Shipping fast and
                  breaking conventions.
                </p>

                <p className="text-xs text-muted-foreground">
                  Joined January 2025
                </p>

                <Separator />

                <div className="flex w-full justify-around py-2">
                  <div className="text-center">
                    <p className="text-sm font-bold">3</p>
                    <p className="text-xs text-muted-foreground">Campaigns</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold">12k</p>
                    <p className="text-xs text-muted-foreground">Visitors</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold">98%</p>
                    <p className="text-xs text-muted-foreground">Uptime</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ---- Edit Tab ---- */}
          <TabsContent value="edit">
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>
                  Update your personal information below.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  {/* Display Name */}
                  <Controller
                    name="displayName"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Display Name
                        </FieldLabel>
                        <FieldContent>
                          <Input
                            id={field.name}
                            placeholder="Your display name"
                            aria-invalid={fieldState.invalid}
                            {...field}
                          />
                        </FieldContent>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Email */}
                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                        <FieldContent>
                          <Input
                            id={field.name}
                            type="email"
                            placeholder="you@example.com"
                            aria-invalid={fieldState.invalid}
                            {...field}
                          />
                        </FieldContent>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Bio */}
                  <Controller
                    name="bio"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
                        <FieldContent>
                          <Textarea
                            id={field.name}
                            placeholder="Tell us about yourself (max 280 characters)"
                            aria-invalid={fieldState.invalid}
                            {...field}
                          />
                        </FieldContent>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save changes"}
                  </Button>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </Layout>
  );
}
