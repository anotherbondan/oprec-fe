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
import { FileText, Plus, Eye, Trash2, Search, ChevronDown } from "lucide-react";
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
import { useCallback, useEffect, useState } from "react";
import { customFetch } from "@/src/lib/api-client";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Label } from "@/src/components/ui/label";
import { useAuth } from "@/src/hooks/useAuth";

interface Form {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  _count: { questions: number };
}

export default function FormsPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const currentSort = searchParams.get("sort") || "desc";

  const [searchInput, setSearchInput] = useState(currentSearch);

  const { isLoading: isAuthLoading, user: currentUser } = useAuth();

  useEffect(() => {
    if (!isAuthLoading && !currentUser) {
      router.push("/login");
    }
  }, [isAuthLoading, currentUser, router]);

  const {
    data: forms,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["forms", currentSearch, currentSort],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (currentSearch) params.append("search", currentSearch);
      if (currentSort) params.append("sort", currentSort);

      return await customFetch<Form[]>(`/forms?${params.toString()}`, {
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

    onSuccess: () => {
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

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== currentSearch) {
        router.replace(
          `${pathname}?${createQueryString("search", searchInput)}`,
          {
            scroll: false,
          },
        );
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput, currentSearch, pathname, router, createQueryString]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="min-h-screen bg-secondary/10">
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex md:items-center md:justify-between mb-8 gap-3 max-md:flex-col">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Forms</h1>
            <p className="text-muted-foreground mt-1">
              Manage all your forms here.
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="max-md:w-fit">
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
                <Label htmlFor="form-title">Form Title</Label>
                <Input
                  id="form-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter form title"
                />
                <Label htmlFor="form-description">Form Description</Label>
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

        <div className="flex gap-2 items-center mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute z-10 left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search forms..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="items-center gap-2">
                {currentSort === "desc" ? "Newest First" : "Oldest First"}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() =>
                  router.replace(
                    `${pathname}?${createQueryString("sort", "desc")}`,
                    { scroll: false },
                  )
                }
              >
                Newest First
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.replace(
                    `${pathname}?${createQueryString("sort", "asc")}`,
                    { scroll: false },
                  )
                }
              >
                Oldest First
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
                  {form._count.questions} Questions
                </p>
              </CardContent>

              <CardFooter className="p-4 flex gap-2 border-t mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 p-2"
                  asChild
                >
                  <Link href={`/forms/${form.id}`}>
                    <Eye className="w-4 h-4 mr-2" /> View
                  </Link>
                </Button>
                <Dialog>
                  <DialogTrigger
                    asChild
                    className="shadow-none hover:bg-neutral-100"
                  >
                    <Button
                      size="icon"
                      className="hover:bg-red-100 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-4 h-4 " />
                    </Button>
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
                        disabled={
                          deleteFormMutation.isPending &&
                          deleteFormMutation.variables === form.id
                        }
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
    </div>
  );
}
