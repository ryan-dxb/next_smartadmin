import { RequestWithFiles } from "@/utils/fileParser";
import { Request } from "express";

export interface CreatePostRequest extends RequestWithFiles, Request {
  body: {
    title: string;
    content: string;
    slug: string;
    meta?: string;
    tags?: string[];
  };
}

export interface UpdatePostRequest extends RequestWithFiles, Request {
  body: {
    title: string;
    content: string;
    slug: string;
    meta?: string;
    tags?: string[];
  };
  params: {
    postId: string;
  };
}

export interface DeletePostRequest extends Request {
  params: {
    postId: string;
  };
}

export interface GetPostByIdRequest extends Request {
  params: {
    postId: string;
  };
}
