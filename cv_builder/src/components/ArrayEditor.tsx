import React from 'react'

export default function ArrayEditor({ title, items, renderItem, onAdd }: { title: string; items: any[]; renderItem: (item: any, i: number) => React.ReactNode; onAdd: () => void }) {
  return (
    <div className="items">
      <h2>{title}</h2>
      {items.map(renderItem)}
      <button className="btn ghost" onClick={onAdd}>Add</button>
    </div>
  )
}
