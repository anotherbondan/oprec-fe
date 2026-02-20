"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { FileText, Plus, Eye, Trash2 } from "lucide-react";
import { Navbar } from "@/src/components/elements/Navbar";
import { Footer } from "@/src/components/elements/Footer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { customFetch } from "@/src/lib/api-client";
import { toast } from "sonner";

interface Option {
  id: string;
  questionId: string;
  text: string;
  order: number;
}

interface Question {
  id: string;
  formId: string;
  text: string;
  type: string;
  isRequired: boolean;
  order: number;
  options: Option[];
}

interface Form {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  questions?: Question[];
}

export default function FormsPage() {
  const queryClient = useQueryClient();

  const {
    data: forms,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["forms"],
    queryFn: async () => {
      return await customFetch<Form[]>("/forms", {
        method: "GET",
      });
    },
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const createFormMutation = useMutation({
    mutationFn: async () => {
      return await customFetch("/forms", {
        method: "POST",
        body: JSON.stringify({ title, description }),
      });
    },

    onSuccess: (newForm) => {
      toast.success("Form created successfully!");

      queryClient.invalidateQueries({ queryKey: ["forms"] });

      setTitle("");
      setDescription("");
      setOpen(false);
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const deleteFormMutation = useMutation({
  mutationFn: async (id: string) => {
    return await customFetch(`/forms/${id}`, {
      method: "DELETE",
    });
  },

  onSuccess: () => {
    toast.success("Form deleted successfully!");
    queryClient.invalidateQueries({ queryKey: ["forms"] });
  },

  onError: (error: Error) => {
    toast.error(error.message);
  },
});

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="min-h-screen bg-secondary/10">
      <Navbar />
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Forms</h1>
            <p className="text-muted-foreground mt-1">
              Manage all your forms here.
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
              <Plus className="w-4 h-4 mr-2" /> Create New Form
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Form</DialogTitle>
                <DialogDescription>
                  Add a new form to manage your forms.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2">
                <label htmlFor="form-title">Form Title</label>
                <Input
                  id="form-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter form title"
                />
                <label htmlFor="form-description">Form Description</label>
                <Input
                  id="form-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter form description"
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  onClick={() => createFormMutation.mutate()}
                  disabled={createFormMutation.isPending}
                >
                  {createFormMutation.isPending
                    ? "Creating..."
                    : "Save changes"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms?.map((form) => (
            <Card
              key={form.id}
              className="hover:shadow-md transition-shadow bg-background"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                    {new Date(form.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <CardTitle className="text-xl line-clamp-1">
                  {form.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 min-h-10">
                  {form.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground font-medium">
                  {form.questions?.length ?? 0} Questions
                </p>
              </CardContent>

              <CardFooter className="pt-2 flex gap-2 border-t mt-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link href={`/forms/${form.id}`}>
                    <Eye className="w-4 h-4 mr-2" /> View
                  </Link>
                </Button>
                <Dialog>
                  <DialogTrigger className="bg-transparent shadow-none hover:bg-neutral-100">
                      <Trash2 className="w-4 h-4 text-red-600" />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Form</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this form?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button
                        onClick={() => deleteFormMutation.mutate(form.id)}
                        disabled={deleteFormMutation.isPending && deleteFormMutation.variables === form.id}
                      >
                        {deleteFormMutation.isPending
                          ? "Deleting..."
                          : "Delete"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
