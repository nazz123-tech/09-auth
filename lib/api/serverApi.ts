

import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';
import { validTags } from './clientApi';
import { FetchNotesResponse } from './clientApi';
import { FetchNotesParams} from './clientApi';

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
     
      Cookie: cookieStore.toString(),
    },
  });
 
  return res;
};
export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
export const fetchServerNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`,{
    headers:{
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
export const fetchServerNotes = async (
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

  const { data } = await nextServer.get<FetchNotesResponse>("/notes", { 
    params,
    headers:{
      Cookie:cookieStore.toString(),
    }
   });

  return data;
};

