'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Toolbar from '../Toolbar/Toolbar';
import Editor from '../Editor/Editor';
import styles from './TemplatePreview.module.scss';
import { useUndoRedo } from '../../hooks/useUndoRedo';

export interface Template {
  id: string;
  name: string;
  content: string;
  previewMode: 'desktop' | 'tablet' | 'mobile';
  isEditable: boolean;
}

const TemplatePreview = () => {
  const [template, setTemplate] = useState<Template>({
    id: '1',
    name: 'Default Template',
    content: 'Edit this text to see real-time updates!',
    previewMode: 'desktop',
    isEditable: true,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);

  const { value: content, setValue: setContent, undo, redo } = useUndoRedo(
    template.content,
    'templateContent'
  );

  const handleModeChange = (mode: Template['previewMode']) => {
    setTemplate((prev) => ({ ...prev, previewMode: mode }));
  };

  const handleSave = () => {
    setTemplate((prev) => ({ ...prev, isEditable: false }));
    alert('Template saved!');
  };

  const handleEdit = () => {
    setTemplate((prev) => ({ ...prev, isEditable: true }));
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
      <span>Loading...</span>
    </div>
  );
  
  if (error) return (
    <div className={styles.error}>
      <span className="error-icon">❌</span>
      <span>{error}</span>
    </div>
  );

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.preview}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Toolbar
          previewMode={template.previewMode}
          onModeChange={handleModeChange}
          onSave={handleSave}
          onEdit={handleEdit}
          isEditable={template.isEditable}
          onUndo={undo}
          onRedo={redo}
        />
        <Editor
          content={content}
          onChange={setContent}
          isEditable={template.isEditable}
          previewMode={template.previewMode}
        />
      </motion.div>
    </div>
  );
};

export default TemplatePreview;