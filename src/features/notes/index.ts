export interface Note {
  _id: string
  title: string
  text?: string
  createdAt: Date
  updatedAt?: Date
}

export interface AddNote {
  title: string
  text?: string
}

export interface UpdateNoteQueryProps {
  _id: string
  patch: AddNote
}
