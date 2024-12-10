import React from 'react';
import { showFormattedDate } from '../utils';
export function ArsipsNotes({
  titleHeader,
  notesList,
  handleArchive,
  handleDelete,
}) {
  const isActiveNotes =
    titleHeader === 'Catatan Aktif'
      ? notesList.filter((node) => !node.archived)
      : notesList.filter((node) => node.archived);
  // const activeNotes = notesList.filter((note) => !note.archived);
  return (
    <div className="w-full px-24 pt-5">
      <h1 className="text-2xl font-bold">{titleHeader}</h1>
      {isActiveNotes.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {isActiveNotes.map((note) => (
            <div
              key={note.id}
              className="border-2 p-4 w-64 flex flex-col justify-between"
            >
              <div className="">
                <h2 className="text-xl font-semibold truncate ...">
                  {note.title}
                </h2>
                <span className="text-sm text-gray-400">
                  {showFormattedDate(note.createdAt)}
                </span>
              </div>
              <p>{note.body}</p>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => handleDelete(note.id)}
                  className="text-red-300 hover:text-red-500"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleArchive(note.id)}
                  className="text-yellow-200 hover:text-yellow-500"
                >
                  {titleHeader === 'Catatan Aktif' ? 'Arsipkan' : 'Pindahkan'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">Tidak ada catatan</p>
      )}
    </div>
  );
}
