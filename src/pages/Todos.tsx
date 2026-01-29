import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Input from "../components/Input";
import ConfirmModal from "../components/ConfirmModal";
import { setTodos, setPage, setLoading } from "../store/todosSlice";
import bgImage from "../assets/background.jpg";

const todoSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

interface Todo {
  _id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: string;
}

const LIMIT = 5;

const Todos = () => {
  const dispatch = useDispatch();
  const { todos, page, totalPages, loading } = useSelector(
    (state: RootState) => state.todos
  );
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchTodos = async () => {
    dispatch(setLoading(true));

    try {
      const res = await api.get("/todos", {
        params: { page, limit: LIMIT },
      });

      const todosData = res.data.data;
      const pagination = res.data.pagination;
      const totalPagesFromApi = pagination?.pages || 1;

      if (page > totalPagesFromApi) {
        dispatch(setPage(totalPagesFromApi));
        return;
      }

      dispatch(setTodos({ todos: todosData, totalPages: totalPagesFromApi }));
    } catch {
      toast.error("Failed to load todos");
      dispatch(setTodos({ todos: [], totalPages: 1 }));
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [page]);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/todos/delete/${id}`);
      toast.success("Todo deleted");
      fetchTodos();
    } catch {
      toast.error("Failed to delete todo");
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await api.patch(`/todos/update/${id}`, { status });
      fetchTodos();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handlePriorityChange = async (id: string, priority: string) => {
    try {
      await api.patch(`/todos/update/${id}`, { priority });
      fetchTodos();
    } catch {
      toast.error("Failed to update priority");
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-accent-100 text-accent-800 border-accent-300";
      case "medium":
        return "bg-accent-50 text-accent-700 border-accent-200";
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-primary-200 text-primary-900";
      case "in_progress":
        return "bg-accent-100 text-accent-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen relative" style={{backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}}>
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
      <div className="relative z-10">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">My Todos</h1>
          <p className="text-gray-600">Manage your tasks efficiently</p>
        </div>

        <Formik
          initialValues={{ title: "", description: "" }}
          validationSchema={todoSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await api.post("/todos/add", {
                ...values,
                priority: "medium",
              });
              toast.success("Todo created");
              resetForm();
              fetchTodos();
            } catch {
              toast.error("Failed to create todo");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, values, handleChange, errors, touched }) => (
            <Form className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl mb-8 border border-primary-100">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Create New Todo</h3>
              <div className="space-y-4">
                <Input
                  placeholder="Enter todo title"
                  value={values.title}
                  onChange={handleChange("title")}
                  error={touched.title ? errors.title : ""}
                  label="Title"
                  required
                />
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Description <span className="text-accent-600">*</span>
                  </label>
                  <textarea
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
                    placeholder="Enter description"
                    value={values.description}
                    onChange={handleChange("description")}
                    rows={3}
                    required
                  />
                  {touched.description && errors.description && (
                    <p className="text-accent-600 text-sm mt-1.5">{errors.description}</p>
                  )}
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} size="lg">
                {isSubmitting ? "Creating..." : "Add Todo"}
              </Button>
            </Form>
          )}
        </Formik>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500"></div>
            <p className="mt-4 text-gray-600">Loading todos...</p>
          </div>
        )}

        {!loading && todos.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No todos yet</h3>
            <p className="text-gray-600">Create your first todo to get started!</p>
          </div>
        )}

        <div className="grid gap-4 mb-8">
          {todos.map((todo: Todo) => (
            <div
              key={todo._id}
              className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-primary-100 transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{todo.title}</h3>
                  <p className="text-gray-600 mb-4">{todo.description}</p>
                  <div className="flex gap-3 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(todo.priority)}`}>
                      {todo.priority.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(todo.status)}`}>
                      {todo.status.replace("_", " ").toUpperCase()}
                    </span>
                  </div>
                </div>
                <Button onClick={() => setDeleteConfirm(todo._id)} variant="danger" size="sm">
                  Delete
                </Button>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                    value={todo.status}
                    onChange={(e) => handleStatusChange(todo._id, e.target.value)}
                    aria-label="Todo status"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Priority</label>
                  <select
                    className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                    value={todo.priority}
                    onChange={(e) => handlePriorityChange(todo._id, e.target.value)}
                    aria-label="Todo priority"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 bg-white p-4 rounded-xl shadow-lg">
            <Button
              disabled={page === 1}
              onClick={() => dispatch(setPage(page - 1))}
              variant="secondary"
            >
              ← Previous
            </Button>

            <span className="text-gray-700 font-semibold">
              Page {page} of {totalPages}
            </span>

            <Button
              disabled={page === totalPages}
              onClick={() => dispatch(setPage(page + 1))}
              variant="secondary"
            >
              Next →
            </Button>
          </div>
        )}
      </div>
      <ConfirmModal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => deleteConfirm && handleDelete(deleteConfirm)}
        title="Delete Todo"
        message="Are you sure you want to delete this todo? This action cannot be undone."
      />
      </div>
    </div>
  );
};

export default Todos;
