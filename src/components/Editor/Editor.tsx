import React from 'react';
import styles from './Editor.module.scss';
import { motion } from 'framer-motion';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  isEditable: boolean;
  previewMode: 'desktop' | 'tablet' | 'mobile';
}

const Editor: React.FC<EditorProps> = ({ content, onChange, isEditable, previewMode }) => {
  return (
    <motion.div
      className={`${styles.editorWrapper} ${styles[previewMode]}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <textarea
        className={styles.editor}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start typing..."
        readOnly={!isEditable}
      />
    </motion.div>
  );
};

export default Editor;
