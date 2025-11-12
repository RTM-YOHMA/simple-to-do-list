"use client"

import type React from "react"

import { useState } from "react"

interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: number
}

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, title: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.title)

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.title) {
      onEdit(todo.id, editText.trim())
    } else {
      setEditText(todo.title)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEdit()
    } else if (e.key === "Escape") {
      setEditText(todo.title)
      setIsEditing(false)
    }
  }

  return (
    <div
      className={`group flex items-center gap-4 p-4 rounded-xl transition-all ${
        todo.completed
          ? "bg-slate-700/30 border border-slate-700/50"
          : "bg-slate-800 border border-slate-700/50 hover:border-slate-600/80 hover:shadow-lg hover:shadow-blue-500/10"
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${
          todo.completed ? "bg-green-500 border-green-500" : "border-slate-600 hover:border-green-500"
        }`}
      >
        {todo.completed && (
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      {/* Task Text or Input */}
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-slate-700 text-white px-3 py-1 rounded-lg border-2 border-blue-500 outline-none"
        />
      ) : (
        <span
          onClick={() => setIsEditing(true)}
          className={`flex-1 cursor-pointer transition-all ${
            todo.completed ? "text-slate-500 line-through" : "text-white hover:text-blue-400"
          }`}
        >
          {todo.title}
        </span>
      )}

      {/* Delete Button */}
      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
        aria-label="Delete task"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}
