import React, { useState } from 'react';
import Swal from 'sweetalert2';
export default function AddNotes({ notesList }) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  // console.log('title', title);
  const length = 50 - (title?.length || 0);

  function handleSubmit(e) {
    e.preventDefault();
    if (title.length >= 51) {
      Swal.fire({
        icon: 'error',
        title: 'Judul Terlalu Panjang',
        text: `Judul tidak boleh lebih dari 50 karakter.`,
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }
    if (title !== '' && notes !== '') {
      const newNote = {
        id: new Date().getTime() + Math.random().toString().replace('.', ''),
        title,
        body: notes,
        createdAt: new Date().toISOString(),
        archived: false,
      };

      notesList((prev) => [...prev, newNote]);

      setTitle('');
      setNotes('');
      // console.log(newNote);
      Swal.fire({
        icon: 'success',
        title: 'Catatan Berhasil Dibuat',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-[450px] flex flex-col justify-center m-auto mt-14 space-y-2">
          <h1 className="text-2xl ">Buat catatan</h1>
          <span
            className={`self-end text-sm ${
              length >= 0 ? 'text-white/50' : 'text-red-500'
            }`}
          >
            Sisa karakter: {length}
          </span>
          <input
            type="text"
            placeholder="ini adalah judul ... "
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            max={50}
            required
            className="text-sm  "
          />
          <textarea
            className="text-sm min-h-44"
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
            placeholder="tuliskan catatanmu disini  ..."
            required
          />
          <button
            type="submit"
            className="border-solid border-2 border-white/50 rounded-md text-sm py-1"
          >
            buat
          </button>
        </div>
      </form>
    </>
  );
}
