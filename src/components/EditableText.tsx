interface Props {
  value: string;
  onChange: (v: string) => void;
  editMode: boolean;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
  multiline?: boolean;
}

const EditableText = ({ value, onChange, editMode, className = '', tag: Tag = 'span', multiline = false }: Props) => {
  if (!editMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  if (multiline) {
    return (
      <textarea
        className={`editable bg-transparent resize-none w-full ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        aria-label="Редактировать текст"
      />
    );
  }

  return (
    <Tag
      className={`editable inline-block min-w-[2ch] ${className}`}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onChange((e.target as HTMLElement).innerText)}
      dangerouslySetInnerHTML={{ __html: value }}
      aria-label="Редактировать текст"
    />
  );
};

export default EditableText;
