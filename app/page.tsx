"use client"

import { useState, useEffect } from "react"
import TodoHeader from "@/components/todo-header"
import TodoInput from "@/components/todo-input"
import TodoList from "@/components/todo-list"
import TodoStats from "@/components/todo-stats"

interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: number
}

type FilterType = "all" | "active" | "completed"

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<FilterType>("all")
  const [mounted, setMounted] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("todos")
    if (stored) {
      try {
        setTodos(JSON.parse(stored))
      } catch (error) {
        console.error("Failed to load todos:", error)
      }
    }
    setMounted(true)
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }, [todos, mounted])

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: Date.now(),
    }
    setTodos([newTodo, ...todos])
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const editTodo = (id: string, title: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title } : todo)))
  }

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-600 via-white-500 to-blue-700 text-neutral-400 bg-red-300">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <TodoHeader />

        {/* Stats */}
        <TodoStats stats={stats} />

        {/* Input */}
        <TodoInput onAdd={addTodo} />

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 rounded-lg bg-slate-800/50 p-2 backdrop-blur-sm">
          {(["all", "active", "completed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2 px-4 rounded-lg transition-all font-medium text-sm ${
                filter === f
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                  : "bg-slate-700/50 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Todo List */}
        {filteredTodos.length > 0 ? (
          <>
            <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />

            {/* Clear Completed Button */}
            {stats.completed > 0 && filter !== "active" && (
              <button
                onClick={clearCompleted}
                className="w-full mt-6 py-3 px-4 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors font-medium"
              >
                Clear Completed Tasks
              </button>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-slate-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-slate-400 text-lg">
              {filter === "completed"
                ? "No completed tasks yet"
                : filter === "active"
                  ? "All tasks completed!"
                  : "No tasks yet. Add one to get started!"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
