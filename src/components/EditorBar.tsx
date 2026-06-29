import Icon from '@/components/ui/icon';

interface Props {
  editMode: boolean;
  onToggle: () => void;
  onSave: () => void;
  onReset: () => void;
}

const EditorBar = ({ editMode, onToggle, onSave, onReset }: Props) => {
  return (
    <div className="fixed top-4 right-4 z-[100] flex items-center gap-2">
      {editMode && (
        <>
          <button
            onClick={onReset}
            className="h-9 px-3 rounded-xl glass-light text-muted-foreground hover:text-foreground text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Сбросить изменения"
          >
            <Icon name="RotateCcw" size={14} />
            Сбросить
          </button>
          <button
            onClick={onSave}
            className="h-9 px-3 rounded-xl bg-accent text-accent-foreground text-xs font-bold flex items-center gap-1.5 glow transition-all hover:scale-105"
          >
            <Icon name="Check" size={14} />
            Сохранить
          </button>
        </>
      )}
      <button
        onClick={onToggle}
        title={editMode ? 'Выйти из редактора' : 'Редактировать тексты'}
        className={`h-9 w-9 rounded-xl flex items-center justify-center transition-all ${
          editMode
            ? 'bg-accent text-accent-foreground glow'
            : 'glass-light text-muted-foreground hover:text-foreground'
        }`}
      >
        <Icon name={editMode ? 'X' : 'Pencil'} size={16} />
      </button>
    </div>
  );
};

export default EditorBar;
