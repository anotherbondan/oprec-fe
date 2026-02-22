"use client"

import { useAuth } from "@/src/hooks/useAuth";
import { customFetch } from "@/src/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { Form } from "@/src/modules/FormGroup/interface";
import EditorViewPage from "@/src/modules/FormGroup/EditorViewModule";
import RespondentViewPage from "@/src/modules/FormGroup/RespondentViewModule";
import { useEffect } from "react";

export default function FormDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  
  const { user: currentUser, isLoading: isAuthLoading } = useAuth(); 
  const {
    data: form,
    isLoading: isFormLoading, 
    isError,
  } = useQuery<Form>({
    queryKey: ["form", id],
    queryFn: async () => {
      return await customFetch<Form>(`/forms/${id}`, {
        method: "GET",
      });
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (!isAuthLoading && !currentUser) {
      router.push("/login");
    }
  }, [isAuthLoading, currentUser, router]);

  const isPageLoading = isFormLoading || isAuthLoading || !form;

  if (isPageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading form...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Failed to load form</p>
      </div>
    );
  }

  const isAuthor = form.userId === currentUser?.id;

  return (
    <>
      {isAuthor ? (
        <EditorViewPage form={form} />
      ) : (
        <RespondentViewPage form={form} />
      )}
    </>
  );
}