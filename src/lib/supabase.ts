import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { ObjectStorage } from "./storage";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const buketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET!;

class SupaBaseStorage implements ObjectStorage {
  public client: SupabaseClient;
  constructor() {
    this.client = createClient(supabaseUrl, supabaseKey);
  }
  async upload(path: string, file: NodeJS.ReadableStream): Promise<any> {
    const { data, error } = await this.client.storage
      .from(buketName)
      .upload(path, file);
    if (data) {
      return true;
    } else {
      throw new Error(error?.message);
    }
  }
  async download(path: string): Promise<string> {
    const { data, error } = await this.client.storage
      .from(buketName)
      .createSignedUrl(path, 5 * 60);
    if (data) {
      return data.signedURL;
    } else {
      throw new Error(error?.message);
    }
  }
  async query(path: string): Promise<boolean> {
    const { data } = await this.client.storage
      .from(buketName)
      .createSignedUrl(path, 30);
    if (data) {
      return true;
    } else {
      return false;
    }
  }
}

export const supaBaseStorageClient = new SupaBaseStorage();
