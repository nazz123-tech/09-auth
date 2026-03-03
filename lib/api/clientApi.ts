import type { Note } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";

export interface FetchNotesResponse{
    notes: Note[],
    totalPage: number
}
export interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage: number;
  tag?: string;
}

export type Request={
  email:string,
  password:string
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}
type CheckSessionRequest={
  success:boolean;
}


export const validTags = ["all", "Todo", "Personal", "Work", "Meeting", "Shopping"];

export const fetchNotes = async (
  tag: string,
  query?: string,
  page?: number
): Promise<FetchNotesResponse> => {
  if (!validTags.includes(tag)) {
    throw new Error(`Invalid tag: ${tag}`);
  }
  const params: FetchNotesParams = {
    perPage: 12,
  };

  if (query) params.search = query;
  if (page) params.page = page;
  if (tag !== "all") params.tag = tag;

  const { data } = await nextServer.get<FetchNotesResponse>("/notes", { params });

  return data;
};
export const createNote = async (newNote: CreateNotePayload): Promise<Note> => {
  const { data } = await nextServer.post<Note>('/notes', newNote);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
};


export const register=async(data:Request):Promise<User>=>{
  const res = await nextServer.post<User>('/auth/register',data);
  return res.data
}
export const login=async(data:Request):Promise<User>=>{
  const res = await nextServer.post<User>('/auth/login',data);
  return res.data
}

export const checkSession=async()=>{
  const res= await nextServer.get<CheckSessionRequest>('/auth/session')
  return res.data.success
}
export const getMe=async()=>{
  const {data}= await nextServer.get<User>('/users/me')
  return data
}
export const logout=async():Promise<void>=>{
  await nextServer.post('/auth/logout')
}

export type UpdateUserRequest = {
  username?: string;
};

export const updateMe = async (payload: UpdateUserRequest):Promise<User> => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};
