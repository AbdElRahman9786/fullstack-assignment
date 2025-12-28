import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTasks } from "@/hooks/useTasks";
import TaskTable from "@/components/tasks/TaskTable";
import Pagination from "@/components/tasks/Pagination";
import CreateTaskDialog from "@/components/tasks/CreateTaskDialog";
import EditTaskDialog from "@/components/tasks/EditTaskDialog";
import DeleteTaskDialog from "@/components/tasks/DeleteTaskDialog";

export default function Tasks() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const { data, isLoading, isError, error } = useTasks({ page, limit });

  // Extract tasks and pagination info from response
  // Adjust these based on your API response structure
  const tasks = data?.tasks || data?.data || [];
  const totalPages = data?.totalPages || data?.meta?.totalPages || 1;
  const totalItems = tasks.length

  const handleEdit = (task) => {
    setSelectedTask(task);
    setEditDialogOpen(true);
  };

  const handleDelete = (task) => {
    setSelectedTask(task);
    setDeleteDialogOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-destructive text-center">
              {error?.response?.data?.message || "Failed to load tasks"}
            </p>
            <Button className="w-full mt-4" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-2xl font-bold">My Tasks</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {totalItems} task{totalItems !== 1 ? "s" : ""} total
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setCreateDialogOpen(true)}>
                + New Task
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <TaskTable
              tasks={tasks}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isLoading={isLoading}
            />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <CreateTaskDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
      <EditTaskDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        task={selectedTask}
      />
      <DeleteTaskDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        task={selectedTask}
      />
    </div>
  );
}
