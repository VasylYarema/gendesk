import React from 'react';
import styles from './Toolbar.module.scss';

interface ToolbarProps {
  previewMode: 'desktop' | 'tablet' | 'mobile';
  onModeChange: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  onSave: () => void;
  onEdit: () => void;
  isEditable: boolean;
  onUndo: () => void; // Undo handler
  onRedo: () => void; // Redo handler
}

const Toolbar: React.FC<ToolbarProps> = ({
  previewMode,
  onModeChange,
  onSave,
  onEdit,
  isEditable,
  onUndo,
  onRedo,
}) => {
  return (
    <div className={styles.toolbar}>
      {['desktop', 'tablet', 'mobile'].map((mode) => (
        <button
          key={mode}
          className={`${styles.button} ${previewMode === mode ? styles.active : ''}`}
          onClick={() => onModeChange(mode as 'desktop' | 'tablet' | 'mobile')}
        >
          {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </button>
      ))}
      <button disabled={!isEditable} className={styles.button} onClick={onUndo}>
        Undo
      </button>
      <button disabled={!isEditable} className={styles.button} onClick={onRedo}>
        Redo
      </button>
      {isEditable ? (
        <button className={styles.saveButton} onClick={onSave}>
          Save
        </button>
      ) : (
        <button className={styles.editButton} onClick={onEdit}>
          Edit
        </button>
      )}
    </div>
  );
};

export default Toolbar;
