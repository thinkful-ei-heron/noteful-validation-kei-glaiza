import React from 'react'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { findNote } from '../notes-helpers'
import PropTypes from 'prop-types'
import './NotePageMain.css'

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

  render() {
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }
    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}

NotePageMain.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      noteId: PropTypes.string.isRequired
    })
  })
}
