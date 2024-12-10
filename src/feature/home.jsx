import React, { useEffect, useState } from 'react';
import { Header } from '../components/header';
import AddNotes from '../components/addNotes';
import { getInitialData } from '../utils';
import { ArsipsNotes } from '../components/arsipsNotes';
import Swal from 'sweetalert2';
function Home() {
  const [notesList, setNotesList] = useState([]);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    setNotesList(getInitialData);
  }, []);

  const handleSearch = (query) => {
    setSearchText(query);
  };

  const filteredNotes = notesList.filter(
    (note) =>
      note.title.toLowerCase().includes(searchText) ||
      note.body.toLowerCase().includes(searchText)
  );

  const handleArchive = (id, isArchived) => {
    setNotesList((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      )
    );
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: isArchived
        ? 'Catatan berhasil dipindahkan ke Catatan Aktif'
        : 'Catatan berhasil diarsipkan',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      setNotesList((prev) => prev.filter((note) => note.id !== id));
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  };
  return (
    <div>
      <Header onSearch={handleSearch} />
      <main>
        <AddNotes notesList={setNotesList} />
        <ArsipsNotes
          titleHeader={'Catatan Aktif'}
          notesList={filteredNotes.filter((note) => !note.archived)}
          handleArchive={(id) => handleArchive(id, false)}
          handleDelete={handleDelete}
        />
        <ArsipsNotes
          titleHeader={'Arsip'}
          notesList={filteredNotes.filter((note) => note.archived)}
          handleArchive={(id) => handleArchive(id, true)}
          handleDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default Home;
