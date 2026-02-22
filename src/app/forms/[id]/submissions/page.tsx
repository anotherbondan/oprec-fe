"use client";

import { useAuth } from "@/src/hooks/useAuth";
import { customFetch } from "@/src/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { Form } from "@/src/modules/FormGroup/interface";
import SubmissionViewPage from "@/src/modules/FormGroup/SubmissionModule";
import { useEffect } from "react";

export default function SubmissionsPage() {
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

  // Only form authors can view submissions
  useEffect(() => {
    if (form && currentUser && form.userId !== currentUser.id) {
      router.push(`/forms/${id}`);
    }
  }, [form, currentUser, router, id]);

  const isPageLoading = isFormLoading || isAuthLoading || !form;

  if (isPageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
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

  return <SubmissionViewPage form={form} />;
}
