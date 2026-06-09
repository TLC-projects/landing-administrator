'use client';
import { type ChangeEvent, useReducer, useRef } from 'react';
import { toast } from 'sonner';

import { Content } from '@/src/core/domain/entities/content';

import type { ContentFormModes } from '../types/content';

interface UseContentFormProps {
  mode?: ContentFormModes;
  initialData?: Content | null;
}

interface FormState {
  title: string;
  duration: string;
  description: string;
  objective: string;
  performances: string[];
  imageFile: File | null;
  imagePreview: string | null;
  brochureFile: File | null;
  brochurePreview: string | null;
  isVisible: boolean;
  isDragging: boolean;
  isBrochureDragging: boolean;
  isEditing: boolean;
}

type FormAction =
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_DURATION'; payload: string }
  | { type: 'SET_DESCRIPTION'; payload: string }
  | { type: 'SET_OBJECTIVE'; payload: string }
  | { type: 'ADD_PERFORMANCE' }
  | { type: 'UPDATE_PERFORMANCE'; payload: { index: number; value: string } }
  | { type: 'REMOVE_PERFORMANCE'; payload: number }
  | { type: 'SET_IMAGE'; payload: { file: File; preview: string } }
  | { type: 'SET_BROCHURE'; payload: { file: File; preview: string | null } }
  | { type: 'SET_VISIBILITY'; payload: boolean }
  | { type: 'SET_DRAGGING'; payload: boolean }
  | { type: 'SET_BROCHURE_DRAGGING'; payload: boolean }
  | { type: 'TOGGLE_EDIT_MODE' }
  | { type: 'REMOVE_IMAGE' }
  | { type: 'REMOVE_BROCHURE' }
  | { type: 'RESET_FORM'; payload: FormState }
  | { type: 'CANCEL_EDIT'; payload: FormState };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'SET_DESCRIPTION':
      return { ...state, description: action.payload };
    case 'SET_OBJECTIVE':
      return { ...state, objective: action.payload };
    case 'ADD_PERFORMANCE':
      return { ...state, performances: [...state.performances, ''] };
    case 'UPDATE_PERFORMANCE':
      return {
        ...state,
        performances: state.performances.map((item, i) => (i === action.payload.index ? action.payload.value : item))
      };
    case 'REMOVE_PERFORMANCE':
      return {
        ...state,
        performances: state.performances.filter((_, i) => i !== action.payload)
      };
    case 'SET_IMAGE':
      return { ...state, imageFile: action.payload.file, imagePreview: action.payload.preview };
    case 'SET_BROCHURE':
      return { ...state, brochureFile: action.payload.file, brochurePreview: action.payload.preview };
    case 'SET_VISIBILITY':
      return { ...state, isVisible: action.payload };
    case 'SET_DRAGGING':
      return { ...state, isDragging: action.payload };
    case 'SET_BROCHURE_DRAGGING':
      return { ...state, isBrochureDragging: action.payload };
    case 'TOGGLE_EDIT_MODE':
      return { ...state, isEditing: !state.isEditing };
    case 'REMOVE_IMAGE':
      return { ...state, imageFile: null, imagePreview: null };
    case 'REMOVE_BROCHURE':
      return { ...state, brochureFile: null, brochurePreview: null };
    case 'RESET_FORM':
      return action.payload;
    case 'CANCEL_EDIT':
      return action.payload;
    default:
      return state;
  }
}

function getInitialState(mode: ContentFormModes, initialData: Content | null): FormState {
  let performances = [''];

  if (initialData?.performance) {
    try {
      const parsed = JSON.parse(initialData.performance);
      performances = Array.isArray(parsed) && parsed.length > 0 ? parsed : [''];
    } catch {
      performances = [''];
    }
  }

  return {
    title: initialData?.title || '',
    duration: initialData?.duration || '',
    description: initialData?.description || '',
    objective: initialData?.objectives || '',
    performances,
    imageFile: null, // ✅ Correcto - siempre null al cargar
    imagePreview: initialData?.resources[0].url || null,
    brochureFile: null, // ✅ Debe ser null - NO crear File desde URL
    brochurePreview: initialData?.brochureUrl || null, // ✅ Solo la URL
    isVisible: initialData?.isVisible ?? true,
    isDragging: false,
    isBrochureDragging: false,
    isEditing: mode === 'create' || mode === 'edit'
  };
}

export function useContentForm({ mode = 'create', initialData = null }: UseContentFormProps = {}) {
  const [state, dispatch] = useReducer(formReducer, getInitialState(mode, initialData));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const brochureInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      // Validar tamaño (1MB)
      const maxSize = 1 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error('Imagen muy grande', {
          description: `La imagen debe ser menor a 1MB. Tamaño actual: ${(file.size / 1024 / 1024).toFixed(2)}MB`
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch({ type: 'SET_IMAGE', payload: { file, preview: reader.result as string } });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBrochureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tamaño (8MB = 8 * 1024 * 1024 bytes)
      const maxSize = 8 * 1024 * 1024; // 8MB

      if (file.size > maxSize) {
        toast.error('Archivo muy grande', {
          description: `El brochure debe ser menor a 8MB. Tamaño actual: ${(file.size / 1024 / 1024).toFixed(2)}MB`
        });
        return;
      }

      // Si es imagen, generar preview
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          dispatch({ type: 'SET_BROCHURE', payload: { file, preview: reader.result as string } });
        };
        reader.readAsDataURL(file);
      } else {
        // Si es PDF, no generar preview visual
        dispatch({ type: 'SET_BROCHURE', payload: { file, preview: null } });
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_DRAGGING', payload: true });
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_DRAGGING', payload: false });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_DRAGGING', payload: false });
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch({ type: 'SET_IMAGE', payload: { file, preview: reader.result as string } });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBrochureDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_BROCHURE_DRAGGING', payload: true });
  };

  const handleBrochureDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_BROCHURE_DRAGGING', payload: false });
  };

  const handleBrochureDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_BROCHURE_DRAGGING', payload: false });
    const file = e.dataTransfer.files?.[0];
    if (file) {
      // Validar tamaño
      const maxSize = 8 * 1024 * 1024; // 8MB

      if (file.size > maxSize) {
        toast.error('Archivo muy grande', {
          description: `El brochure debe ser menor a 8MB. Tamaño actual: ${(file.size / 1024 / 1024).toFixed(2)}MB`
        });
        return;
      }

      // Validar que sea PDF o imagen
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (validTypes.includes(file.type)) {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            dispatch({ type: 'SET_BROCHURE', payload: { file, preview: reader.result as string } });
          };
          reader.readAsDataURL(file);
        } else {
          dispatch({ type: 'SET_BROCHURE', payload: { file, preview: null } });
        }
      } else {
        toast.error('Formato no válido', {
          description: 'Solo se permiten archivos PDF, JPG, PNG o WebP'
        });
      }
    }
  };

  const removeImage = () => {
    dispatch({ type: 'REMOVE_IMAGE' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeBrochure = () => {
    dispatch({ type: 'REMOVE_BROCHURE' });
    if (brochureInputRef.current) brochureInputRef.current.value = '';
  };

  const resetForm = () => {
    dispatch({ type: 'RESET_FORM', payload: getInitialState('create', null) });
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (brochureInputRef.current) brochureInputRef.current.value = '';
  };

  const toggleEditMode = () => dispatch({ type: 'TOGGLE_EDIT_MODE' });

  const cancelEdit = () => {
    dispatch({ type: 'CANCEL_EDIT', payload: getInitialState(mode, initialData) });
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (brochureInputRef.current) brochureInputRef.current.value = '';
  };

  return {
    // State
    title: state.title,
    duration: state.duration,
    description: state.description,
    objective: state.objective,
    performances: state.performances,
    imageFile: state.imageFile,
    imagePreview: state.imagePreview,
    brochureFile: state.brochureFile,
    brochurePreview: state.brochurePreview,
    isVisible: state.isVisible,
    isDragging: state.isDragging,
    isBrochureDragging: state.isBrochureDragging,
    isEditing: state.isEditing,
    fileInputRef,
    brochureInputRef,

    // Setters
    setTitle: (value: string) => dispatch({ type: 'SET_TITLE', payload: value }),
    setDuration: (value: string) => dispatch({ type: 'SET_DURATION', payload: value }),
    setDescription: (value: string) => dispatch({ type: 'SET_DESCRIPTION', payload: value }),
    setObjective: (value: string) => dispatch({ type: 'SET_OBJECTIVE', payload: value }),
    setIsVisible: (value: boolean) => dispatch({ type: 'SET_VISIBILITY', payload: value }),
    addPerformance: () => dispatch({ type: 'ADD_PERFORMANCE' }),
    updatePerformance: (index: number, value: string) =>
      dispatch({ type: 'UPDATE_PERFORMANCE', payload: { index, value } }),
    removePerformance: (index: number) => dispatch({ type: 'REMOVE_PERFORMANCE', payload: index }),

    // Handlers
    handleImageChange,
    handleBrochureChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleBrochureDragOver,
    handleBrochureDragLeave,
    handleBrochureDrop,
    removeImage,
    removeBrochure,
    resetForm,
    toggleEditMode,
    cancelEdit
  };
}
