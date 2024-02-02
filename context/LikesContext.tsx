"use client";

import { fetchPosts } from "@/lib/controllers/post";
import React, { createContext, useEffect, useState } from "react";

type LikesContextType = {
  likesState: Record<string, number>;
  setLikesState: React.Dispatch<React.SetStateAction<Record<string, number>>>;
};

const defaultLikesContext: LikesContextType = {
  likesState: {},
  setLikesState: () => {},
};
export const LikesContext = createContext(defaultLikesContext);

export const LikesProvider = ({
  children,
  initialLikesState,
}: {
  children: React.ReactNode;
  initialLikesState: Record<string, number>;
}) => {
  const [likesState, setLikesState] =
    useState<Record<string, number>>(initialLikesState);

  return (
    <LikesContext.Provider value={{ likesState, setLikesState }}>
      {children}
    </LikesContext.Provider>
  );
};
