'use client';
import { useReducer, useRef, type ChangeEvent } from "react"
import type { Content, ContentFormModes } from "../types/content"

interface UseContentFormProps {
  mode?: ContentFormModes
  initialData?: Content | null
}

interface FormState {
  title: string
  duration: string
  description: string
  imageFile: File | null
  imagePreview: string | null
  isVisible: boolean
  isDragging: boolean
  isEditing: boolean
}

type FormAction =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_DURATION"; payload: string }
  | { type: "SET_DESCRIPTION"; payload: string }
  | { type: "SET_IMAGE"; payload: { file: File; preview: string } }
  | { type: "SET_VISIBILITY"; payload: boolean }
  | { type: "SET_DRAGGING"; payload: boolean }
  | { type: "TOGGLE_EDIT_MODE" }
  | { type: "REMOVE_IMAGE" }
  | { type: "RESET_FORM"; payload: FormState }
  | { type: "CANCEL_EDIT"; payload: FormState }

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload }
    case "SET_DURATION":
      return { ...state, duration: action.payload }
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload }
    case "SET_IMAGE":
      return {
        ...state,
        imageFile: action.payload.file,
        imagePreview: action.payload.preview,
      }
    case "SET_VISIBILITY":
      return { ...state, isVisible: action.payload }
    case "SET_DRAGGING":
      return { ...state, isDragging: action.payload }
    case "TOGGLE_EDIT_MODE":
      return { ...state, isEditing: !state.isEditing }
    case "REMOVE_IMAGE":
      return { ...state, imageFile: null, imagePreview: null }
    case "RESET_FORM":
      return action.payload
    case "CANCEL_EDIT":
      return action.payload
    default:
      return state
  }
}

function getInitialState(
  mode: ContentFormModes,
  initialData: Content | null
): FormState {
  return {
    title: initialData?.title || "",
    duration: initialData?.duration || "",
    description: initialData?.description || "",
    imageFile: null,
    imagePreview: initialData?.imageUrl || null,
    isVisible: initialData?.isVisible ?? true,
    isDragging: false,
    isEditing: mode === "create" || mode === "edit",
  }
}

export function useContentForm({
  mode = "create",
  initialData = null,
}: UseContentFormProps = {}) {
  const [state, dispatch] = useReducer(
    formReducer,
    getInitialState(mode, initialData)
  )

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onloadend = () => {
        dispatch({
          type: "SET_IMAGE",
          payload: { file, preview: reader.result as string },
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    dispatch({ type: "SET_DRAGGING", payload: true })
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    dispatch({ type: "SET_DRAGGING", payload: false })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    dispatch({ type: "SET_DRAGGING", payload: false })
    
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onloadend = () => {
        dispatch({
          type: "SET_IMAGE",
          payload: { file, preview: reader.result as string },
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    dispatch({ type: "REMOVE_IMAGE" })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const resetForm = () => {
    dispatch({
      type: "RESET_FORM",
      payload: getInitialState("create", null),
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const toggleEditMode = () => {
    dispatch({ type: "TOGGLE_EDIT_MODE" })
  }

  const cancelEdit = () => {
    dispatch({
      type: "CANCEL_EDIT",
      payload: getInitialState(mode, initialData),
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return {
    // State values
    title: state.title,
    duration: state.duration,
    description: state.description,
    imageFile: state.imageFile,
    imagePreview: state.imagePreview,
    isVisible: state.isVisible,
    isDragging: state.isDragging,
    isEditing: state.isEditing,
    fileInputRef,

    // Setters (dispatch wrapped)
    setTitle: (value: string) => dispatch({ type: "SET_TITLE", payload: value }),
    setDuration: (value: string) => dispatch({ type: "SET_DURATION", payload: value }),
    setDescription: (value: string) => dispatch({ type: "SET_DESCRIPTION", payload: value }),
    setIsVisible: (value: boolean) => dispatch({ type: "SET_VISIBILITY", payload: value }),

    // Handlers
    handleImageChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    removeImage,
    resetForm,
    toggleEditMode,
    cancelEdit,
  }
}