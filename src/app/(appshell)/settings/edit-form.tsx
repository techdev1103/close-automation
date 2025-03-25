"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateUserFormSchema, CreateUserFormValues } from "@/types/zod/user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateUser } from "@/actions/user";
import { registerWebhook } from "@/actions/user";
import { useAuthContext } from "@/auth/hooks";
import { toast } from "sonner";
import { IUser } from "@/types/user";
import { useRouter } from "next/navigation";

// ----------------------------------------------------------------------

export const EditFormPage = ({ setting }: { setting: IUser }) => {
  const { user } = useAuthContext();
  const router = useRouter();

  const defaultValues: Partial<CreateUserFormValues> = {
    displayName: setting.displayName,
    closeApiKey: setting.closeApiKey,
    sheetId: setting.sheetId,
    googleAuthKey: setting.googleAuthKey,
  };

  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(CreateUserFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: CreateUserFormValues) => {
    const { error: updateUserError } = await updateUser(user?.id || "", data);
    const { data: testData, error: registerWebhookError } =
      await registerWebhook({
        apiKey: setting.closeApiKey || "",
      });

    console.log("testData->");

    if (updateUserError && registerWebhookError) {
      toast("Update User Error.");
    } else {
      toast("Setting is updated successfully.");
    }
  };

  return (
    <div className="flex flex-col mx-auto p-6 gap-4">
      <div className="text-[32px]">Setting</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="enter a display name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="closeApiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Close API Key</FormLabel>
                  <FormControl>
                    <Input placeholder="enter a close api key" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sheetId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Sheet Id</FormLabel>
                  <FormControl>
                    <Input placeholder="enter a google sheet id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="googleAuthKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Auth Key</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="enter a google auth key"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between space-x-2">
              <div></div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    router.push("/home");
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
