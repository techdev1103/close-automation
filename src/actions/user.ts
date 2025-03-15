import { supabase } from "@/lib/supabase";
import { IUser } from "@/types/user";

export const getUser = async (
  id: string
): Promise<{
  data?: IUser;
  error?: any;
}> => {
  try {
    const { data: user, error: getUserError } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (getUserError) {
      return { error: getUserError };
    }

    const tempUser = {
      displayName: user.display_name,
      sheetId: user.sheet_id,
      closeApiKey: user.close_api_key,
      googleAuthKey: user.google_auth_key,
    };

    return { data: tempUser };
  } catch (error) {
    console.error(`getUser Error:`, error);
    return { error };
  }
};

export const updateUser = async (
  id: string,
  data: IUser
): Promise<{
  data?: any;
  error?: any;
}> => {
  try {
    const tempUser = {
      display_name: data.displayName,
      close_api_key: data.closeApiKey,
      sheet_id: data.sheetId,
      google_auth_key: data.googleAuthKey,
    };

    const { data: user, error: updateUserError } = await supabase
      .from("users")
      .update(tempUser)
      .eq("id", id);

    if (updateUserError) {
      return { error: updateUserError };
    }

    return { data: user };
  } catch (error) {
    console.error(`updateUser Error:`, error);
    return { error };
  }
  return { data };
};
