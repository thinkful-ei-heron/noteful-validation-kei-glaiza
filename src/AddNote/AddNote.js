import React from 'react';
import ValidationError from '../ValidationError/ValidationError';
import ApiContext from '../ApiContext';
import config from '../config';
import './AddNote.css';

export default class AddNote extends React.Component {
    static contextType = ApiContext
    constructor(props) {
        super(props)
        this.state = {
            title: {
                value: '',
                touched: false
            },
            content: {
                value: '',
                touched: false
            },
            folder: {
                value: '',
                touched: false
            }
        }
    }

  updateNoteName(name) {
    this.setState({title: {value:name, touched: true}})
  }

  updateNoteContent(content) {
    this.setState({content: {value:content, touched: true}})
  }

  updateNoteFolder(id) {
    this.setState({folder: {value: id, touched: true}})
  }

  handleSubmit(event) {
    event.preventDefault();
    const {title, content, folder } = this.state
    const noteToAdd = {
      name: title.value,
      content: content.value,
      folderId: folder.value,
      modified: new Date()
    }
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(noteToAdd)
    })
    .then(response => {
      if(!response.ok){
        return response.json().then(e=>Promise.reject(e))
      }
      return response.json()
    })
    .then((res)  => {
      const newArray = this.context.notes
      newArray.push(res)
      this.context.notes = newArray
      this.props.history.push('/')
    })
    .catch(error => {
      console.error(error)
    })
  }

  validateFolderName() {
    const name = this.state.folder.value.trim();
    if(name.length === 0) {
      return 'Folder name is required'
    }
  }

  validateNoteName() {
    const name = this.state.title.value.trim();
    if(name.length === 0) {
      return 'Note name is required'
    } else if (name.length > 150) {
      return 'Note name must be less than 150 characters.'
    }
  }

  validateContentName() {
    const content = this.state.content.value.trim();
    if(content.length === 0) {
      return 'Content is required'
    } else if (content.length > 500) {
      return 'Content must be less than 500 characters.'
    }
  }

  render() {
    const titleError = this.validateNoteName();
    const contentNameError = this.validateContentName();
    const folderNameError = this.validateFolderName();
    return (
      <section>
        <form className="add-note" onSubmit={ e=> this.handleSubmit(e)}>
          <h2>Create Note</h2>
          <div className="form-group">
            <label htmlFor="note-name">
              Name
            </label>
            <input type="text" className="note-input" name="note-name" id="note-name" onChange={e => this.updateNoteName(e.target.value)}>
            </input>
            {this.state.title.touched && <ValidationError message={titleError} />}
          </div>
          <div className="form-group">
            <label htmlFor="content-name">
              Content
            </label>
            <textarea className="content-input" name="content-name" id="content-name" onChange={e=> this.updateNoteContent(e.target.value)}/>
            {this.state.content.touched && <ValidationError message={contentNameError} />}
          </div>
          <div className="form-group">
            <label htmlFor="folder-select">Choose a folder:</label>
            <select name="folder-select" id="folder-select" onChange={e=>this.updateNoteFolder(e.target.value)}>
              <option value="">Please select a folder</option>
              {this.context.folders.map(folder => {
                return (
                  <option key={folder.id} value={folder.id}>{folder.name}</option>
                )
              })}
            </select>
            {this.state.folder.touched && <ValidationError message={folderNameError} />}
          </div>
          <button className="add-note-button" disabled={this.validateNoteName() || 
            this.validateContentName() || this.validateFolderName()
            }
           >
            Add Note</button>
        </form>
      </section>
    )
  }
}