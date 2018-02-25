import React, { Component } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'

import { NewPollForm } from '../components'

class NewPollPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: "",
      shortName: "",
      choices: ['choice1', 'choice2'],
      newChoice: "",
      error: "",
      submitted: false,
      redirectpath: '#'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleChoiceDelete = this.handleChoiceDelete.bind(this)
    this.handleChoiceAdd = this.handleChoiceAdd.bind(this)
  }


  handleInputChange(e, choice, iter, newState={}) {

    if (choice || choice === '') {
      const choices = [...this.state.choices]
      choices[iter] = choice
      newState = {choices}
    } else {
      newState = {
        [e.target.name]: e.target.value
      }
    }
    newState.error = ''
    this.setState(newState)
  }

  handleChoiceDelete(index) {
    const newChoices = this.state.choices.filter((_, i) =>
      index !== i
    )

    this.setState({choices: newChoices})
  }

  handleChoiceAdd(choice) {

    if (choice){
      const choices = [...this.state.choices].concat(choice)
      this.setState({choices, newChoice: ""})
    }

  }


  handleSubmit(event) {
    event.preventDefault()

    this.props.updateAuthStatus(user => {

      // Return early if user is no longer logged in
      if (!user.isAuthenticated) return

      const { title, shortName, choices } = this.state
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")
  
      fetch("/submit_new_poll", {
        method: "POST",
        headers: myHeaders,
        cache: "default",
        credentials: "same-origin",
        body: JSON.stringify({ title, shortName, choices })
      })
        .then(res => res.json()).then(data => {
          console.log(`handleSubmit data: ${JSON.stringify(data, null, 2)}`)
          const { success, message, poll: { username, shortName } } = data
          this.setState({
            error: success ? '' : message,
            submitted: success ? true : false,
            redirectpath: `/user/${username}/polls/${shortName}`
          })
        })
        .catch(console.error)
    })

  }

  render() {
    const { submitted, redirectpath } = this.state
    
    if (submitted) {
      return <Redirect to={redirectpath} />
    }

    return (
      <NewPollForm
        handleInputChange={this.handleInputChange}
        handleChoiceDelete={this.handleChoiceDelete}
        handleChoiceAdd={this.handleChoiceAdd}
        handleSubmit={this.handleSubmit}
        { ...this.state }
      />
    )
  }
}


export default NewPollPage